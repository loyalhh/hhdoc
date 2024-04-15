# 执行上下文

## 1、执行顺序 变量提升-函数提升

```javascript
// 变量提升
var foo = function () {
    console.log('foo1')
}
foo() // foo1
var foo = function () {
    console.log('foo2')
}
foo() // foo2
```

```javascript
// 函数提升
function foo() {
    console.log('foo1')
}
foo() // foo2
function foo() {
    console.log('foo2')
}
foo() // foo2
```

## 2、执行上下文

JavaScript 中的执行上下文（Execution Context）是在代码执行时创建的环境，它包含了当前执行代码所需的所有信息。JavaScript 引擎在执行代码时，会为每段代码创建执行上下文，并按照一定的规则进行管理和执行。

执行上下文可以分为三种类型：

1. 全局执行上下文：当 JavaScript 代码被解析时，会首先创建全局执行上下文。全局执行上下文是整个 JavaScript 代码的默认执行环境，它在浏览器中表示的是全局对象 window，在 Node.js 环境中表示的是 global 对象。全局执行上下文只有一个，在页面关闭时销毁。

2. 函数执行上下文：每当调用一个函数时，都会为该函数创建一个函数执行上下文。函数执行上下文与函数相关联，包含了函数内部的局部变量、参数和内部函数的引用等信息。每次函数调用都会创建一个新的函数执行上下文，且函数执行上下文可以嵌套。

3. eval 执行上下文：当代码被 eval 函数执行时，会创建一个 eval 执行上下文。eval 执行上下文与函数执行上下文类似，但它的作用域链会被修改，以包含调用它的上下文中的变量对象。

一个执行上下文的生命周期可以分为两个阶段。

1. 创建阶段：在这个阶段中，执行上下文会分别创建变量对象，建立作用域链，以及确定 this 的指向。

2. 代码执行阶段：创建完成之后，就会开始执行代码，这个时候，会完成变量赋值，函数引用，以及执行其他代码。

### 变量对象

变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。

#### （1）全局上下文

可以通过 this 引用，在客户端 JavaScript 中，全局对象就是 Window 对象。

#### （2）函数上下文

在函数上下文中，我们用活动对象(activation object, AO)来表示变量对象。
活动对象是在进入函数上下文时刻被创建的，它通过函数的 arguments 属性初始化。arguments 属性值是 Arguments 对象。

#### （3）执行过程

1. 执行上下文的代码会分成两个阶段进行处理：进入执行上下文、代码执行

2. 未进入执行阶段之前，变量对象(VO)中的属性都不能访问！但是进入执行阶段之后，变量对象(VO)转变为了活动对象(AO)，里面的属性都能被访问了，然后开始进行执行阶段的操作。

3. AO 实际上是包含了 VO 的。因为除了 VO 之外，AO 还包含函数的 parameters，以及 arguments 这个特殊对象。也就是说 AO 的确是在进入到执行阶段的时候被激活，但是激活的除了 VO 之外，还包括函数执行时传入的参数和 arguments 这个特殊对象。
   AO = VO + function parameters + arguments

#### （4）变量对象组成

1. 函数的所有形参 (如果是函数上下文)

    - 由名称和对应值组成的一个变量对象的属性被创建
    - 没有实参，属性值设为 undefined

2. 函数声明
    - 由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建
    - 如果变量对象已经存在相同名称的属性，则完全替换这个属性
3. 变量声明
    - 由名称和对应值（undefined）组成一个变量对象的属性被创建；
    - 如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性

举个例子：

```javascript
function foo(a) {
    var b = 2
    function c() {}
    var d = function () {}
    b = 3
}
foo(1)
```

在进入执行上下文后，这时候的 AO 是：

```javascript
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: undefined,
    c: reference to function c(){},
    d: undefined
}
```

代码执行
在代码执行阶段，会顺序执行代码，根据代码，修改变量对象的值
还是上面的例子，当代码执行完后，这时候的 AO 是：

```javascript
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: 3,
    c: reference to function c(){},
    d: reference to FunctionExpression "d"
}
```

总结我们上述所说：

1. 全局上下文的变量对象初始化是全局对象
2. 函数上下文的变量对象初始化只包括 Arguments 对象
3. 在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值
4. 在代码执行阶段，会再次修改变量对象的属性值

## 3、总结

-   每个函数调用都会创建一个新的执行上下文，并将其推入执行上下文栈的顶部。
-   变量提升会将变量和函数声明提升至其所在作用域的顶部。
-   变量对象用于存储变量和函数声明。
-   作用域链用于确定变量的访问权限。
-   this 关键字的值取决于函数的调用方式。
-   内部函数可以访问外部函数的变量，形成了闭包。
-   执行环境类型包括全局执行环境和函数执行环境。