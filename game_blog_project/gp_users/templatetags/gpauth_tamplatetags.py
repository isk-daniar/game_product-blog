from django import template
from django.urls import NoReverseMatch, reverse
from django.utils.html import escape, format_html
from django.utils.safestring import mark_safe


register = template.Library()


@register.simple_tag
def optional_login(request):
    try:
        login_url = reverse('gp_users:auth_login')
    except NoReverseMatch:
        return ''

    snippet = """<a class="gp-header-login-button" href='{href}?next={next}'>
                    <span class="gp-header-login-text">Log in</span>
                </a>"""
    snippet = format_html(snippet, href=login_url, next=escape(request.path))

    return mark_safe(snippet)


@register.simple_tag
def optional_docs_login(request):
    try:
        login_url = reverse('gp_users:auth_login')
    except NoReverseMatch:
        return 'log in'

    snippet = "<a href='{href}?next={next}'>log in</a>"
    snippet = format_html(snippet, href=login_url, next=escape(request.path))

    return mark_safe(snippet)


@register.simple_tag
def optional_logout(request, user):
    try:
        logout_url = reverse('gp_users:auth_logout')
    except NoReverseMatch:
        snippet = format_html('<li class="gp-user-name">{user}</li>', user=escape(user))
        return mark_safe(snippet)

    snippet =  """<div class="">
                      <button class="btn gp-user-name" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {user}  
                        <span  class="gp-header-icon">
                            <img src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4NCA4NCIgY2xhc3M9IiIgc3R5bGU9IiI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOm5vbmU7c3Ryb2tlOiM2YmE1Mzk7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLXdpZHRoOjRweDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmdseXBocy1iaXN0dWRpby11c2VyLXN0cm9rZWQ8L3RpdGxlPjxwYXRoIGNsYXNzPSJjbHMtMSBDcmJYc3Brdl8wIiBkPSJNMiw0MkE0MCw0MCAwLDEsMSA4Miw0MkE0MCw0MCAwLDEsMSAyLDQyIj48L3BhdGg+PHBhdGggY2xhc3M9ImNscy0xIENyYlhzcGt2XzEiIGQ9Ik0yOS40LDI2LjNBMTIuOSwxMy44IDAsMSwxIDU1LjE5OTk5OTk5OTk5OTk5NiwyNi4zQTEyLjksMTMuOCAwLDEsMSAyOS40LDI2LjMiPjwvcGF0aD48cGF0aCBjbGFzcz0iY2xzLTEgQ3JiWHNwa3ZfMiIgZD0iTTUyLjMsNDAuN2MxLjUsMS44LDguMywxMCw4LjMsMjEuNywwLDAtNC45LDYuNS0xNy44LDcuNWgtMWMtMTMtMS0xNy44LTcuNS0xNy44LTcuNSwwLTExLjcsNi45LTE5LjgsOC4zLTIxLjciPjwvcGF0aD48c3R5bGU+LkNyYlhzcGt2XzB7c3Ryb2tlLWRhc2hhcnJheToyNTIgMjU0O3N0cm9rZS1kYXNob2Zmc2V0OjI1MzthbmltYXRpb246Q3JiWHNwa3ZfZHJhdyA1MDBtcyBlYXNlLWluIDBtcyBmb3J3YXJkczt9LkNyYlhzcGt2XzF7c3Ryb2tlLWRhc2hhcnJheTo4NCA4NjtzdHJva2UtZGFzaG9mZnNldDo4NTthbmltYXRpb246Q3JiWHNwa3ZfZHJhdyA1MDBtcyBlYXNlLWluIDBtcyBmb3J3YXJkczt9LkNyYlhzcGt2XzJ7c3Ryb2tlLWRhc2hhcnJheTo4OCA5MDtzdHJva2UtZGFzaG9mZnNldDo4OTthbmltYXRpb246Q3JiWHNwa3ZfZHJhdyA1MDBtcyBlYXNlLWluIDBtcyBmb3J3YXJkczt9QGtleWZyYW1lcyBDcmJYc3Brdl9kcmF3ezEwMCV7c3Ryb2tlLWRhc2hvZmZzZXQ6MDt9fUBrZXlmcmFtZXMgQ3JiWHNwa3ZfZmFkZXswJXtzdHJva2Utb3BhY2l0eToxO305MS40ODkzNjE3MDIxMjc2NyV7c3Ryb2tlLW9wYWNpdHk6MTt9MTAwJXtzdHJva2Utb3BhY2l0eTowO319PC9zdHlsZT48L3N2Zz4=" width="25px" height="25px">
                        </span>
                      </button>
                      <ul class="dropdown-menu gp-header-dropdown-menu" aria-labelledby="dropdownMenuButton1" data-popper-placement="bottom-start" style="position: absolute; overflow: hidden;  margin: 0px; transform: translate(1317px, 310px);">
                        <li><a class="gp-header-nav-item-button-at" href="">Account Settings</a></li>
                        <li><a class="gp-header-nav-item-button-at" href="http://127.0.0.1:8000/api/v1/blogmenu/">Blog menu</a></li>
                        <div class="divider-user">
                            <div class="lin-user"></div>
                            <li><a class="gp-header-nav-item-button-at" href='{href}?next={next}'>Logout</a></li>
                        </div>
                      </ul>
                    </div>"""
    snippet = format_html(snippet, user=escape(user), href=logout_url, next=escape(request.path))

    return mark_safe(snippet)
