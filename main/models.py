from django.db import models


class Category(models.Model):
    """Категории, к которым относятся товары"""
    name = models.CharField(max_length=150, db_index=True, verbose_name='Название категории')

    # slug = models.SlugField(max_length=150, unique=True)

    class Meta:
        ordering = ('name',)
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.name


class Product(models.Model):
    CURRENCIES = (
        (None, 'choose one of the currencies'),
        ('Руб', 'Руб.'),
        ('Usd.', 'Usd.')
    )
    title = models.CharField(max_length=400, verbose_name='Наименование')
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE,
                                 verbose_name='Выберите категорию'
                                 )
    image = models.ImageField(upload_to='products/%Y/%m/%d', blank=True, verbose_name='Фото')
    amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Стоимость')
    currency = models.CharField(max_length=30, choices=CURRENCIES, blank=True, verbose_name='Валюта')
    description = models.TextField(max_length=4000, verbose_name='Описание')

    class Meta:
        ordering = ('title',)
        verbose_name = 'Продукт'
        verbose_name_plural = 'Продукты'

    def __str__(self):
        return self.title
