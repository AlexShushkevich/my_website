from django.core.management.base import BaseCommand
from myparser.kupiluki_parser import KupilukiParser


class Command(BaseCommand):
    help = "Запуск парсера сайта Kupiluki.by"

    def handle(self, *args, **kwargs):
        parser = KupilukiParser()
        parser.save_to_database()
        self.stdout.write(self.style.SUCCESS("Парсинг завершен успешно!"))

