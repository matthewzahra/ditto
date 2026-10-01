import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ditto.settings")
django.setup()

from user_auth.models import CustomUser
from restaurant.models import Restaurant


def add_restaurants():

    user = CustomUser.objects.get(
        email="test@email.com"
    )

    Restaurant.objects.create(
        user=user,
        name="The Westminster Kitchen",
        address="Westminster",
        latitude=51.4995,
        longitude=-0.1248,
        cuisine="British",
        rating=8,
        info="A relaxed restaurant serving modern British dishes made with seasonal ingredients.",
        visited=True
    )

    Restaurant.objects.create(
        user=user,
        name="Camden Spice House",
        address="Camden",
        latitude=51.5416,
        longitude=-0.1420,
        cuisine="Indian",
        rating=7,
        info="A lively Indian restaurant with a good selection of curries, naan and sharing dishes.",
        visited=True
    )

    Restaurant.objects.create(
        user=user,
        name="Shoreditch Grill",
        address="Shoreditch",
        latitude=51.5256,
        longitude=-0.0754,
        cuisine="British",
        rating=9,
        info="A stylish neighbourhood grill known for hearty portions and a relaxed evening atmosphere.",
        visited=True
    )

    Restaurant.objects.create(
        user=user,
        name="Canary Wharf Pasta Co.",
        address="Canary Wharf",
        latitude=51.5054,
        longitude=-0.0235,
        cuisine="Italian",
        rating=8,
        info="A modern Italian restaurant specialising in fresh pasta, risotto and classic desserts.",
        visited=True
    )

    Restaurant.objects.create(
        user=user,
        name="The Greenwich Table",
        address="Greenwich",
        latitude=51.4826,
        longitude=-0.0077,
        cuisine="British",
        rating=7,
        info="A cosy spot with a seasonal menu and a good selection of traditional British favourites.",
        visited=True
    )

    Restaurant.objects.create(
        user=user,
        name="Notting Hill Kitchen",
        address="Notting Hill",
        latitude=51.5098,
        longitude=-0.1967,
        cuisine="Italian",
        rating=9,
        info="A popular Italian restaurant with fresh ingredients, generous portions and a lively atmosphere.",
        visited=True
    )

    Restaurant.objects.create(
        user=user,
        name="Chelsea Steak & Grill",
        address="Chelsea",
        latitude=51.4875,
        longitude=-0.1687,
        cuisine="British",
        rating=10,
        info="An upmarket restaurant offering quality steaks, classic sides and an extensive drinks menu.",
        visited=True
    )

    Restaurant.objects.create(
        user=user,
        name="Brixton Taco Club",
        address="Brixton",
        latitude=51.4613,
        longitude=-0.1156,
        cuisine="Mexican",
        rating=8,
        info="A colourful and casual restaurant serving tacos, burritos and freshly made salsa."
    )

    Restaurant.objects.create(
        user=user,
        name="Clapham Ramen",
        address="Clapham",
        latitude=51.4627,
        longitude=-0.1387,
        cuisine="Japanese",
        rating=7,
        info="A small Japanese restaurant serving rich ramen, gyoza and a selection of rice dishes."
    )

    Restaurant.objects.create(
        user=user,
        name="The Wimbledon Pantry",
        address="Wimbledon",
        latitude=51.4214,
        longitude=-0.2063,
        cuisine="British",
        rating=8,
        info="A friendly neighbourhood restaurant with a menu built around comforting British classics."
    )

    Restaurant.objects.create(
        user=user,
        name="Riverside Trattoria",
        address="Richmond",
        latitude=51.4613,
        longitude=-0.3037,
        cuisine="Italian",
        rating=9,
        info="A charming Italian restaurant with homemade pasta and a particularly good tiramisu."
    )

    Restaurant.objects.create(
        user=user,
        name="Kingston Curry Room",
        address="Kingston",
        latitude=51.4123,
        longitude=-0.3007,
        cuisine="Indian",
        rating=7,
        info="A welcoming curry house offering both familiar favourites and a few regional specialities."
    )

    Restaurant.objects.create(
        user=user,
        name="Hammersmith Bento",
        address="Hammersmith",
        latitude=51.4927,
        longitude=-0.2230,
        cuisine="Japanese",
        rating=8,
        info="A modern Japanese restaurant with sushi, bento boxes and freshly prepared noodle dishes."
    )

    Restaurant.objects.create(
        user=user,
        name="Ealing Cantina",
        address="Ealing",
        latitude=51.5130,
        longitude=-0.3089,
        cuisine="Mexican",
        rating=6,
        info="A casual Mexican restaurant with affordable food, generous portions and a lively atmosphere."
    )

    Restaurant.objects.create(
        user=user,
        name="Wembley Masala",
        address="Wembley",
        latitude=51.5560,
        longitude=-0.2795,
        cuisine="Indian",
        rating=9,
        info="A busy Indian restaurant praised for its rich curries, freshly baked naan and generous portions."
    )

    Restaurant.objects.create(
        user=user,
        name="Hampstead Pizzeria",
        address="Hampstead",
        latitude=51.5567,
        longitude=-0.1780,
        cuisine="Italian",
        rating=8,
        info="A cosy pizzeria serving thin-crust pizzas, fresh salads and homemade Italian desserts."
    )

    Restaurant.objects.create(
        user=user,
        name="Islington Izakaya",
        address="Islington",
        latitude=51.5380,
        longitude=-0.1022,
        cuisine="Japanese",
        rating=7,
        info="A relaxed Japanese spot offering small plates, grilled dishes and a selection of sushi."
    )

    Restaurant.objects.create(
        user=user,
        name="Stratford Taco Kitchen",
        address="Stratford",
        latitude=51.5413,
        longitude=0.0032,
        cuisine="Mexican",
        rating=9,
        info="A popular Mexican kitchen known for its tacos, spicy chicken and freshly prepared guacamole."
    )

    Restaurant.objects.create(
        user=user,
        name="Walthamstow Arms",
        address="Walthamstow",
        latitude=51.5886,
        longitude=-0.0190,
        cuisine="British",
        rating=6,
        info="A traditional local pub-style restaurant serving pies, roasts and other British comfort food."
    )

    Restaurant.objects.create(
        user=user,
        name="Poon's",
        address="Westminster",
        latitude=51.51082425901178,
        longitude=-0.11823100305978697,
        cuisine="Indian",
        rating=8,
        info="A well-established restaurant with a varied Indian menu and plenty of vegetarian options."
    )


add_restaurants()