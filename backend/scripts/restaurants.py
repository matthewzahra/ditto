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
        name="Westminster Bistro",
        address="Westminster",
        latitude=51.4995,
        longitude=-0.1248,
        cuisine="English",
        rating=5,
        info="Is a cool bistro"
    )

    Restaurant.objects.create(
        user=user,
        name="Camden Kitchen",
        address="Camden",
        latitude=51.5416,
        longitude=-0.1420,
        cuisine="English",
        rating=4,
        info="Is a cool kitchen"
    )

    Restaurant.objects.create(
        user=user,
        name="Shoreditch Grill",
        address="Shoreditch",
        latitude=51.5256,
        longitude=-0.0754,
        cuisine="English",
        rating=5,
        info="Is a cool grill"
    )

    Restaurant.objects.create(
        user=user,
        name="Canary Wharf Café",
        address="Canary Wharf",
        latitude=51.5054,
        longitude=-0.0235,
        cuisine="English",
        rating=4,
        info="Is a cool café"
    )

    Restaurant.objects.create(
        user=user,
        name="Greenwich Table",
        address="Greenwich",
        latitude=51.4826,
        longitude=-0.0077,
        cuisine="English",
        rating=5,
        info="Is a cool restaurant"
    )

    Restaurant.objects.create(
        user=user,
        name="Notting Hill Eatery",
        address="Notting Hill",
        latitude=51.5098,
        longitude=-0.1967,
        cuisine="English",
        rating=4,
        info="Is a cool eatery"
    )

    Restaurant.objects.create(
        user=user,
        name="Chelsea Steakhouse",
        address="Chelsea",
        latitude=51.4875,
        longitude=-0.1687,
        cuisine="Steakhouse",
        rating=5,
        info="Is a cool steakhouse"
    )

    Restaurant.objects.create(
        user=user,
        name="Brixton Bites",
        address="Brixton",
        latitude=51.4613,
        longitude=-0.1156,
        cuisine="English",
        rating=3,
        info="Is a cool restaurant"
    )

    Restaurant.objects.create(
        user=user,
        name="Clapham Corner",
        address="Clapham",
        latitude=51.4627,
        longitude=-0.1387,
        cuisine="English",
        rating=4,
        info="Is a cool restaurant"
    )

    Restaurant.objects.create(
        user=user,
        name="Wimbledon Pantry",
        address="Wimbledon",
        latitude=51.4214,
        longitude=-0.2063,
        cuisine="English",
        rating=5,
        info="Is a cool pantry"
    )

    Restaurant.objects.create(
        user=user,
        name="Richmond Riverside",
        address="Richmond",
        latitude=51.4613,
        longitude=-0.3037,
        cuisine="English",
        rating=5,
        info="Is a cool restaurant"
    )

    Restaurant.objects.create(
        user=user,
        name="Kingston Kitchen",
        address="Kingston",
        latitude=51.4123,
        longitude=-0.3007,
        cuisine="English",
        rating=4,
        info="Is a cool kitchen"
    )

    Restaurant.objects.create(
        user=user,
        name="Hammersmith House",
        address="Hammersmith",
        latitude=51.4927,
        longitude=-0.2230,
        cuisine="English",
        rating=4,
        info="Is a cool restaurant"
    )

    Restaurant.objects.create(
        user=user,
        name="Ealing Express",
        address="Ealing",
        latitude=51.5130,
        longitude=-0.3089,
        cuisine="English",
        rating=3,
        info="Is a cool restaurant"
    )

    Restaurant.objects.create(
        user=user,
        name="Wembley Spice",
        address="Wembley",
        latitude=51.5560,
        longitude=-0.2795,
        cuisine="Indian",
        rating=5,
        info="Is a cool restaurant"
    )

    Restaurant.objects.create(
        user=user,
        name="Hampstead Hearth",
        address="Hampstead",
        latitude=51.5567,
        longitude=-0.1780,
        cuisine="English",
        rating=5,
        info="Is a cool restaurant"
    )

    Restaurant.objects.create(
        user=user,
        name="Islington Social",
        address="Islington",
        latitude=51.5380,
        longitude=-0.1022,
        cuisine="English",
        rating=4,
        info="Is a cool restaurant"
    )

    Restaurant.objects.create(
        user=user,
        name="Stratford Kitchen",
        address="Stratford",
        latitude=51.5413,
        longitude=0.0032,
        cuisine="English",
        rating=4,
        info="Is a cool kitchen"
    )

    Restaurant.objects.create(
        user=user,
        name="Walthamstow Grill",
        address="Walthamstow",
        latitude=51.5886,
        longitude=-0.0190,
        cuisine="English",
        rating=3,
        info="Is a cool grill"
    )

    Restaurant.objects.create(
        user=user,
        name="Poon's",
        address="Westminster",
        latitude=51.51082425901178,
        longitude=-0.11823100305978697,
        cuisine="Chinese",
        rating=4,
        info="Is a cool restaurant"
    )


add_restaurants()