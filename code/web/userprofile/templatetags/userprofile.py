__author__ = 'MAK'
from django import template
from django.template.defaultfilters import stringfilter

register = template.Library()


@register.simple_tag(name="make_confirm_url", takes_context=True)
def make_confirm_url(context):
    key = context.get('key')
    return ''.join(['http://', context.get('current_site').domain, '/user/confirm/', key])

