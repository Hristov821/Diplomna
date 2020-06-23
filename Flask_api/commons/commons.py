import re

def check_password_requirements(password):
   if re.match(r'[A-Za-z0-9]{8,}', password):
       return True
   return False