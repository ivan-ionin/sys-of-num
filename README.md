# sys-of-num
System of numeration

## Преамбула
Часто возникает ситуация необходимости хранения чисел в формате более коротких строк, особенно часто это связано с метками времени или числовыми данными, предназначенными для формирования имен файлов например, которые не желательно использовать именно в виде чисел.

Данная библиотека позволяет кодировать числа в строковые значения используя как предопределенные наборы символов, так и пользовательские.

В данном случае вознимает вопрос - но почему бы не делать просто вот так:

> 12345.toString(16);

???

Дело в том, что данный подход вернет строку в наборе символов:

0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f

... в то время, как библиотека позволяет переопределить набор, например так:

f,e,d,c,b,a,9,8,7,6,5,4,3,2,1,0

... или так:

9,8,7,6,5,4,3,2,1,0,a,b,c,d,e,f

... или даже так:

9,8,7,6,5,4,3,2,1,0,+,a,b,c,d,e,f,*

## Система счисления

Система счисления определяется в момент создания экземпляра библиотеки как длинна массива переданных символов. То есть при установке набора символов "a, b, c, d, e, f" система счисления будет определена как "шестиричная".

## Предопределенные наборы символов

### x64ascii

> -0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz

### x64friendly

> 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_

Два данных набора различаются положением символов "dash" и "underscore", что как следствие влияет на их вес. Так в первом случае dash равнозначен нуля, а во втором он равен 62.

Предопределение двух таких наборов связано с тем, что в ascii символ dash идет до чисел, а underscore между строчными и прописными буквами, таким образом для выравнивания закодированных строк в файловых системах с использованием в кодировке этих символов необходимо в качестве нуля использовать dash, что тем не менее не привычно для человека. Второй набор x64friendly более дружественен человеку, но именованные через него строки не будут верно выравниваться файловых системах.

### x62

> 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz

### x52

> ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz

### x52revert

> zyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA

Данные наборы имеют зеркальные наборы символов, так в x52 нулем будет являться "A", а в x52revert нулем будет "z".

### x38ascii

> -0123456789_abcdefghijklmnopqrstuvwxyz

### x38friendly

> 0123456789abcdefghijklmnopqrstuvwxyz-_

Положение символов "dash" и "underscore" аналогично наборам x64ascii и x64friendly c той лиш разницей, что в данных наборах отсутствуют заглавные буквы, то есть данные наборы совместимы с системой Windows, в которой невозможно рядом создать два файла с именами например "A" и "a".

### x36

> abcdefghijklmnopqrstuvwxyz

### x26

> abcdefghijklmnopqrstuvwxyz

### x26revert

> zyxwvutsrqponmlkjihgfedcba

Аналогично наборам x52 и x52revert.

## Примеры использования

### Создание экземпляра библиотеки

> const sysOfNum = require('sys-of-num');
> const son = sysOfNum.create();

В случае, если в метод "create" не передан набор символов или имя предопределенного набора символов, то в качестве набора символов будет установлен набор "x62", являющийся набором по умолчанию.

### Получение информации о разрядности установленного набора

> son.getSystem(); // 62

### Получение информации о наборе

> son.getSymbols(); // <массив набора символов>

### Получение предопределенного набора по имени

> son.getSymbolsSetByName(name); // <предопределенный набор name> или пустой массив

### Установка набора символов при создании экземпляра

> const son = sysOfNum.create(); // Установка набора символов по умолчанию (х62)
> const son = sysOfNum.create('x52'); // Установка набора символов x52
> const son = sysOfNum.create(['a', 'b', 'c']); // Установка пользовательского набора и соответственно троичная система счисления
> const son = sysOfNum.create('qwerty'); // Неизвестное имя набора будет интерпретировано как набор ['q', 'w', 'e', 'r', 't', 'y']

В момент установки набора определяется и его система счисления.

### Переопределение набора символов

Аналогично установке набора символов при инициации

> son.setSymbols();
> son.setSymbols('x52');
> son.setSymbols(['a', 'b', 'c']);
> son.setSymbols('qwerty');

### Кодирование

> son.encode();

В случае, если в метод "encode" не передано число - в качестве числа будет использована текущая метка времени, то есть Date.now().

> son.encode(199999999999); // Для набора x52 вернет результат "KGBmJCH", а для набора x52revert "ptyNqxs".

### Раскодирование

> // При наборе x52
> son.decode("KGBmJCH"); // 199999999999
> // При наборе x52revert
> son.decode("ptyNqxs"); // 199999999999

### Пример кодирования в 128-ричную систему и обратно числа 199999999999

> const sysOfNum = require('sys-of-num');
> const son = sysOfNum.create(); // В данный момент в экземпляре установлен набор символов по умолчанию x62
> // Пользовательский набор например
> const mySweetSymbols = "абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split('');
> // Устанавливаем набор экземпляра как x62 расширенный пользовательским набором
> // получаем 62 символа + 66 символов = 128-ричная система
> son.setSymbols([].concat(son.getSymbolsSetByName('x62'), mySweetSymbols));
> // Кодируем / раскодируем
> son.encode(199999999999); // 5Й7tVЯ
> son.decode("5Й7tVЯ"); // 199999999999

### Попробуй, это прикольно

> npm run test

## Фиатюресы

Думаю добавить возможность создания пользовательских алгоритмов замусоривания результирующих строк и соответственно декодер дописать с учетом возможного замусоривания в строке (для конспирации).
