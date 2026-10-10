import os
from PIL import Image

os.makedirs('frontend/public/assets', exist_ok=True)

# 1. Mascot from Student Home Page
img = Image.open('TUTOR IMAGES/STUDENT/Student Home Page.png')
# mascot robot + plant
# In 1536x1024, sidebar width is ~240px. Mascot is at bottom of sidebar:
mascot = img.crop((12, 650, 228, 830))
mascot.save('frontend/public/assets/mascot.png')

# Tutor Logo
logo = img.crop((25, 20, 200, 62))
logo.save('frontend/public/assets/logo.png')

# Course thumbnails from Home page
# Java:
java_thumb = img.crop((293, 536, 553, 646))
java_thumb.save('frontend/public/assets/course_java.png')

# DSA:
dsa_thumb = img.crop((572, 536, 835, 646))
dsa_thumb.save('frontend/public/assets/course_dsa.png')

# Web Dev:
web_thumb = img.crop((854, 536, 1115, 646))
web_thumb.save('frontend/public/assets/course_web.png')

# Continue learning DSA banner
continue_thumb = img.crop((294, 365, 428, 446))
continue_thumb.save('frontend/public/assets/continue_dsa.png')

# Login robot illustration from login interface
if os.path.exists('TUTOR IMAGES/Landing,login,verification Pages/Tutor V2 AI Learning Login Interface.png'):
    login_img = Image.open('TUTOR IMAGES/Landing,login,verification Pages/Tutor V2 AI Learning Login Interface.png')
    login_robot = login_img.crop((440, 360, 810, 715))
    login_robot.save('frontend/public/assets/login_robot.png')

# Course Overview tree banner
if os.path.exists('TUTOR IMAGES/STUDENT/Course Overview Page.png'):
    co_img = Image.open('TUTOR IMAGES/STUDENT/Course Overview Page.png')
    tree_thumb = co_img.crop((260, 120, 535, 260))
    tree_thumb.save('frontend/public/assets/course_overview_banner.png')

print("Assets extracted successfully!")
