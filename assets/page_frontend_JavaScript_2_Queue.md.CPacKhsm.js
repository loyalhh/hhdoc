import{_ as s,c as i,o as a,a4 as n}from"./chunks/framework.D2Zy3zq_.js";const o=JSON.parse('{"title":"队列-事件循环","description":"","frontmatter":{},"headers":[],"relativePath":"page/frontend/JavaScript/2_Queue.md","filePath":"page/frontend/JavaScript/2_Queue.md","lastUpdated":1713174637000}'),l={name:"page/frontend/JavaScript/2_Queue.md"},h=n(`<h1 id="队列-事件循环" tabindex="-1">队列-事件循环 <a class="header-anchor" href="#队列-事件循环" aria-label="Permalink to &quot;队列-事件循环&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>JavaScript 事件循环是一种机制，用于处理异步事件和回调函数。它是 JavaScript 运行时环境的一部分，负责管理事件队列和调用栈。</p></div><h2 id="javascript-是一个单线程语言" tabindex="-1">javascript 是一个单线程语言 <a class="header-anchor" href="#javascript-是一个单线程语言" aria-label="Permalink to &quot;javascript 是一个单线程语言&quot;">​</a></h2><p>javascript 中的所有任务都只有一条线程在处理。</p><p>为了避免一个任务卡死了。那么后面所有的任务都无法被执行。或者有某个任务耗时很长，那么就会导致后面所有的任务都被延迟执行。在这样的环境下，javascript 诞生了两个任务种类：<mark>同步任务</mark>和<mark>异步任务</mark></p><h2 id="事件循环的基本原理" tabindex="-1">事件循环的基本原理 <a class="header-anchor" href="#事件循环的基本原理" aria-label="Permalink to &quot;事件循环的基本原理&quot;">​</a></h2><p>事件循环的核心是一个事件队列，所有的事件都被放入这个队列中，然后按照顺序依次执行。如果队列为空，JavaScript 会等待新的任务加入队列。当 JavaScript 代码执行时，<mark>所有同步任务都会被立即执行</mark>，而异步任务则会被放入事件队列中。</p><p>当所有同步任务执行完毕后，事件循环会从事件队列中取出一个任务，并将其放入调用栈中执行。当该任务执行完毕后，事件循环会再次从事件队列中取出下一个任务，并重复这个过程。</p><h2 id="事件循环的执行过程" tabindex="-1">事件循环的执行过程 <a class="header-anchor" href="#事件循环的执行过程" aria-label="Permalink to &quot;事件循环的执行过程&quot;">​</a></h2><ol><li><p>执行同步代码，直到遇到第一个异步事件（如 setTimeout、setInterval、Promise 等）。</p></li><li><p>将异步事件放入事件队列中，并继续执行同步代码。</p></li><li><p>当所有同步代码执行完毕后，JavaScript 引擎会检查事件队列中是否有事件需要执行。</p></li><li><p>如果事件队列中有事件需要执行，JavaScript 引擎会将第一个事件取出来，并执行对应的回调函数。</p></li><li><p>执行完回调函数后，JavaScript 引擎会再次检查事件队列中是否有事件需要执行，如果有则重复步骤 4，否则继续等待新的事件加入事件队列。</p></li><li><p>如果一个任务执行时间过长，会阻塞事件循环，导致其他任务无法执行。为了避免这种情况，可以将长时间的任务拆分成多个小任务，使用 setTimeout 或 setInterval 分批执行。</p></li><li><p>另外，Promise 也是基于事件循环的机制实现的。当 Promise 状态发生改变时，会将对应的回调函数放入微任务队列中，等待当前任务执行完毕后立即执行。因此，Promise 的回调函数总是在当前任务执行完毕后立即执行，而不会被放入事件队列中等待执行。</p></li></ol><h2 id="javascript-的任务分类" tabindex="-1">javascript 的任务分类 <a class="header-anchor" href="#javascript-的任务分类" aria-label="Permalink to &quot;javascript 的任务分类&quot;">​</a></h2><h3 id="同步任务" tabindex="-1">同步任务 <a class="header-anchor" href="#同步任务" aria-label="Permalink to &quot;同步任务&quot;">​</a></h3><p>同步任务介绍：就是只要被扫描到，就可以被主线程马上执行的任务。（优先于所有异步任务）</p><h3 id="异步任务" tabindex="-1">异步任务 <a class="header-anchor" href="#异步任务" aria-label="Permalink to &quot;异步任务&quot;">​</a></h3><p>异步任务介绍:即使被扫描到，也不会马上执行，异步任务会被压入异步任务队列中，等待主线程中的任务全部清空了，再被召唤执行。</p><p>常见的异步任务有如下几种</p><ul><li>Promise.then() ---微任务</li><li>async/await ---Promise 的语法糖 ---微任务</li><li>setTimeout() ---宏任务</li><li>setInterval() ---宏任务</li><li>...（还有更多，不常见的）</li></ul><p>例如：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;1&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 输出结果是 2，1。虽然setTimeout的延迟是0，但setTimeout是一个异步任务。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 一定会在所有同步任务执行完毕之后再去执行。</span></span></code></pre></div><h3 id="宏任务与微任务" tabindex="-1">宏任务与微任务 <a class="header-anchor" href="#宏任务与微任务" aria-label="Permalink to &quot;宏任务与微任务&quot;">​</a></h3><p>javascript 的异步任务又被分为宏任务和微任务。</p><p>在异步任务中，有些异步任务的平均执行周期很长，这些任务被 javascript 标记为宏任务(比如 setTimeout())。而平均执行周期相对比较短的任务，被 javascript 标记为微任务（比如 promise.then()）。</p><ol><li>当有异步任务被压入异步任务队列时候，javascript 会将这些异步任务分为宏任务和微任务两个新的队列。</li><li>然后，在所有同步任务执行完毕之后，异步任务会优先执行所有已经存在任务队列中的微任务。</li><li>在所有的微任务执行完毕之后，再去宏任务队列中执行一个（注意是一个）宏任务，执行完一个宏任务之后会再去微任务队列中检查是否有新的微任务，有则全部执行，再回到宏任务队列执行一个宏任务，以此循环。这一套流程，就是事件循环（event loop）</li></ol><p>例如 1：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;1&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//异步任务 - 宏任务</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//同步任务</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Promise</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//异步任务 - 微任务</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//同步任务</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 输出结果：2 6 3 1</span></span></code></pre></div><p>例如 2：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//第一个宏任务</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//宏任务中的同步任务</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Promise</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">7</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//宏任务中的微任务</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//异步任务 - 宏任务</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//同步任务</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Promise</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//异步任务 - 微任务</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//第二个宏任务</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//宏任务中的同步任务</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    setTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//宏任务中的宏任务 第四个宏任务</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//第三个宏任务</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    Promise</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//宏任务中的微任务</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//同步任务</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 输出结果：2 6 3 1 7 8 4 5</span></span></code></pre></div><p>注意两点。</p><ul><li>同一批次宏任务中按顺序执行</li><li>一次只执行一个宏任务，然后同步任务当场执行。微任务压入队列。然后就要去检查有没有微任务，有则执行</li></ul><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><ol start="0"><li><p>javascript 是一个单线程语言</p></li><li><p>同步任务优先于异步任务</p></li><li><p>事件循环每一次只执行一个宏任务</p></li><li><p>同一批次下微任务优先于宏任务</p></li></ol>`,31),p=[h];function k(t,e,E,r,d,g){return a(),i("div",null,p)}const c=s(l,[["render",k]]);export{o as __pageData,c as default};
