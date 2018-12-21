import datetime
from decimal import Decimal

from django.conf import settings
from django.contrib.postgres.fields import HStoreField
from django.core.validators import MinValueValidator, RegexValidator
from django.db import models
from django.contrib.auth.models import User
from django.db.models import Q
from django.urls import reverse
from django.utils.encoding import smart_text
from django.utils.text import slugify
from django.utils.translation import pgettext_lazy
# from django_prices.models import MoneyField
from mptt.managers import TreeManager
from mptt.models import MPTTModel
from versatileimagefield.fields import PPOIField, VersatileImageField


# from core.exceptions import InsufficientStock
# from core.models import SortableModel
# from core.utils.taxes import DEFAULT_TAX_RATE_NAME, apply_tax_to_price
# from discount.utils import calculate_discounted_price
from seo.models import SeoModel


class Category(MPTTModel, SeoModel):
    name = models.CharField(max_length=128)
    slug = models.SlugField(max_length=128)
    description = models.TextField(blank=True)
    parent = models.ForeignKey(
        'self', null=True, blank=True, related_name='children',
        on_delete=models.CASCADE)
    background_image = VersatileImageField(
        upload_to='category-backgrounds', blank=True, null=True)

    objects = models.Manager()
    tree = TreeManager()

    class Meta:
        app_label = 'food'
        permissions = (
            ('view_category',
             pgettext_lazy('Permission description', 'Can view categories')),
            ('edit_category',
             pgettext_lazy('Permission description', 'Can edit categories')))

        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name

    def get_absolute_url(self, ancestors=None):
        return reverse('food:category',
                       kwargs={'path': self.get_full_path(ancestors),
                               'category_id': self.id})

    def get_full_path(self, ancestors=None):
        if not self.parent_id:
            return self.slug
        if not ancestors:
            ancestors = self.get_ancestors()
        nodes = [node for node in ancestors] + [self]
        return '/'.join([node.slug for node in nodes])

class ProductType(models.Model):
    name = models.CharField(max_length=128)
    owner = models.ForeignKey(User, related_name="food_types", on_delete=models.CASCADE, null=True)

    # product_attributes = models.ManyToManyField(
    #     'ProductAttribute', related_name='product_types', blank=True)
    # variant_attributes = models.ManyToManyField(
    #     'ProductAttribute', related_name='product_variant_types', blank=True)

    class Meta:
        app_label = 'food'

    def __str__(self):
        return self.name

    def __repr__(self):
        class_ = type(self)
        return '<%s.%s(pk=%r, name=%r)>' % (
            class_.__module__, class_.__name__, self.pk, self.name)


class FoodQuerySet(models.QuerySet):
    def available_foods(self):
        today = datetime.date.today()
        return self.filter(
            Q(available_on__lte=today) | Q(available_on__isnull=True),
            Q(is_published=True))


class Food(SeoModel):
    product_type = models.ForeignKey(
        ProductType, related_name='foods', on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    description = models.TextField()
    category = models.ForeignKey(
        Category, related_name='foods', on_delete=models.CASCADE)
    price = models.DecimalField(
        max_digits=12,
        decimal_places=2)
    available_on = models.DateField(blank=True, null=True)
    is_published = models.BooleanField(default=True)
    attributes = HStoreField(default={}, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    is_featured = models.BooleanField(default=False)
    owner = models.ForeignKey(User, related_name="chef_menus", on_delete=models.CASCADE)
    has_variants = models.BooleanField(default=False)
    has_add_ons = models.BooleanField(default=False)

    objects = FoodQuerySet.as_manager()

    class Meta:
        app_label = 'food'
        permissions = (
            ('view_food',
             pgettext_lazy('Permission description', 'Can view foods')),
            ('edit_food',
             pgettext_lazy('Permission description', 'Can edit foods')),
            ('view_properties',
             pgettext_lazy(
                 'Permission description', 'Can view food properties')),
            ('edit_properties',
             pgettext_lazy(
                 'Permission description', 'Can edit food properties')))

    def __iter__(self):
        if not hasattr(self, '__variants'):
            setattr(self, '__variants', self.variants.all())
        return iter(getattr(self, '__variants'))

    def __repr__(self):
        class_ = type(self)
        return '<%s.%s(pk=%r, name=%r)>' % (
            class_.__module__, class_.__name__, self.pk, self.name)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse(
            'food:details',
            kwargs={'slug': self.get_slug(), 'food_id': self.id})

    def get_slug(self):
        return slugify(smart_text(unidecode(self.name)))

    def is_in_stock(self):
        return any(variant.is_in_stock() for variant in self)

    def is_available(self):
        today = datetime.date.today()
        return self.available_on is None or self.available_on <= today

    def get_first_image(self):
        first_image = self.images.first()
        return first_image.image if first_image else None


class FoodVariant(models.Model):
    name = models.CharField(max_length=255, blank=True)
    price_override = models.DecimalField(
        max_digits=12,
        decimal_places=2, blank=True, null=True)
    food = models.ForeignKey(
        Food, related_name='variants', on_delete=models.CASCADE)
    attributes = HStoreField(default={}, blank=True)
    images = models.ManyToManyField('VariantImage')
    track_inventory = models.BooleanField(default=True)
    quantity = models.IntegerField(
        validators=[MinValueValidator(0)], default=Decimal(1))
    quantity_allocated = models.IntegerField(
        validators=[MinValueValidator(0)], default=Decimal(0))
    cost_price = models.DecimalField(
        max_digits=12,
        decimal_places=2, blank=True, null=True)
    owner = models.ForeignKey(User, related_name="food_variants", on_delete=models.CASCADE, null=True)

    class Meta:
        app_label = 'food'

    def __str__(self):
        return self.name # or self.sku

    @property
    def quantity_available(self):
        return max(self.quantity - self.quantity_allocated, 0)

    # def check_quantity(self, quantity):
    #     """ Check if there is at least the given quantity in stock
    #     if stock handling is enabled.
    #     """
    #     if self.track_inventory and quantity > self.quantity_available:
    #         raise InsufficientStock(self)

    @property
    def base_price(self):
        return self.price_override or self.food.price

    def get_absolute_url(self):
        slug = self.food.get_slug()
        food_id = self.food.id
        return reverse('food:details',
                    kwargs={'slug': slug, 'food_id': food_id})

    def is_in_stock(self):
        return self.quantity_available > 0

    def display_food(self):
        variant_display = str(self)
        food_display = (
            '%s (%s)' % (self.food, variant_display)
            if variant_display else str(self.food))
        return smart_text(food_display)

    def get_first_image(self):
        return self.food.get_first_image()

    def get_ajax_label(self, discounts=None):
        price = self.get_price(discounts).gross
        return '%s, %s, %s' % (
            self.sku, self.display_product(), prices_i18n.amount(price))


class ProductAttribute(models.Model):
    slug = models.SlugField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, related_name='food_attributes', on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ('slug', )

    def __str__(self):
        return self.name

    def get_formfield_name(self):
        return slugify('attribute-%s' % self.slug, allow_unicode=True)

    def has_values(self):
        return self.values.exists()


# class AttributeChoiceValue(SortableModel):
#     name = models.CharField(max_length=100)
#     slug = models.SlugField(max_length=100)
#     attribute = models.ForeignKey(
#         ProductAttribute, related_name='values', on_delete=models.CASCADE)

#     class Meta:
#         ordering = ('sort_order',)
#         unique_together = ('name', 'attribute')

#     def __str__(self):
#         return self.name

#     def get_ordering_queryset(self):
#         return self.attribute.values.all()


class AbstractImage(models.Model):
    image = VersatileImageField(
        upload_to='foods', ppoi_field='ppoi', blank=False)
    ppoi = PPOIField()
    alt = models.CharField(max_length=128, blank=True)

    class Meta:
        app_label = 'food'
        abstract = True


class FoodImage(AbstractImage):
    food = models.ForeignKey(
        Food, related_name='images', on_delete=models.CASCADE)

    def get_ordering_queryset(self):
        return self.food.images.all()


class VariantImage(AbstractImage):
    variant = models.ForeignKey(
        FoodVariant, related_name='variant_images',
        on_delete=models.CASCADE)

    def get_ordering_queryset(self):
        return self.variant.variant_images.all()