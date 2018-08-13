import React from "react";
import ReactDOM from "react-dom";
import StyleEditor from "./StyleEditor.js";
import ResumeEditor from "./ResumeEditor.js";
import "./style/reset.css";
import Prism from "prismjs";

class ReactClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			style: "",
		};
		this.interval = 40;
		this.resumeEditorContent = `
# 冰羽


## 联系方式:
### 邮箱：xzhxpx@qq.com
### QQ：用邮箱搜索即可找到我
### Facebook：[点此查看](https://www.facebook.com/ibingyu)
### QQ群：[278547449](https://jq.qq.com/?_wv=1027&k=5jTg5dW)

## 个人项目：

### [BAT_interviews](https://github.com/lengyue1024/BAT_interviews) (点击链接看看吧)

* 分享最新BAT面试题(包含Linux,PHP,大数据,Python,Java,前端)

### [python_program](https://github.com/lengyue1024/python_program) (点击链接看看吧)

* 记录了自己所写和收集的一些python程序代码


## 个人介绍
 目前是一名大二的在校大学生，主修电子信息工程，兼修计算机与软件应用开发。平时最喜欢做的事是听歌，
 看动漫，还有就是看一些计算机与编程之类的教程。 我在大一时候学过C语言，对于html，php，sql，shell
 都有过了解，python也正在学习中，会操作Linux系统，其实我还是很喜欢Linux的，Kali,deepin,BT5,
 parrot,Ubuntu这些Linux的发行版我都接触过。个人最喜欢的是Ubuntu 16.04（LTS）这个版本。


## 社交平台
**blog: **https://www.bingyublog.com
**GitHub: **https://github.com/lengyue1024
**CSDN：**https://blog.csdn.net/bingyu1024
**知乎：**https://www.zhihu.com/people/bing-yu-77-78
**BiliBili: **https://space.bilibili.com/350216736/

## 座右铭
不去追逐，永远不会拥有。不往前走，永远原地停留。没有所谓失败，除非你不再尝试。

> 如果你喜欢这个效果，Fork [我的项目](https://github.com/lengyue1024)，打造你自己的简历！`;

		this.styleEditorContent = [`/*
* Inspired by http://strml.net/
*
* Hello, 我是冰羽
*
* 我用 React 做了一份简易的动态简历
* 希望大家能够喜欢 ๑乛v乛๑嘿嘿
*/

/* Now,我们开始吧！首先给所有元素加上过渡效果 */
* {
  -webkit-transition: all 1s;
  transition: all 1s;
}
/* 白色背景太单调了，我们来点背景 */
html {
  color: rgb(222,222,222); background: #425261;
}
/* 文字直接显示在页面上，没有任何装饰，真的是low到爆啊！所以我们来给文字加点装饰吧~~ */
.styleEditor {
  position: fixed; left: 0; top: 0;
  background-color: #303030;
  padding: .5em;
  border: 1px solid;
  margin: .5em;
  overflow: auto;
  width: 45vw; height: 90vh;
}
/* 作为一个程序猿，我们不可以太沉闷哦~~，给自己的代码加一点色彩吧 */
.token.comment{ color: #857F6B; font-style: italic; }
.token.selector{ color: #E86E75; }
.token.property{ color: #F78C6C; }
.token.punctuation{ color: #88DCFE; }
.token.function{ color: #82AAFF; }

/* 加一点 3D 效果，更加地酷炫 */
html{
  -webkit-perspective: 1000px;
          perspective: 1000px;
}
.styleEditor {
  position: fixed; left: 0; top: 0;
  -webkit-transition: none;
  transition: none;
  -webkit-transform: rotateY(10deg) translateZ(-100px) ;
          transform: rotateY(10deg) translateZ(-100px) ;
}
/* 不知道以上对代码框的修改你是否喜欢呢？ \^O^/ */

/* 接下来我给自己准备一个编辑器，用来存放我的简历内容 */
.resumeEditor{
  position: fixed; right: 0; top: 0;
  padding: .5em;  margin: .5em;
  width: 48vw; height: 90vh;
  border: 1px solid;
  background: white; color: #222;
  overflow: auto;
}

/* 好了，我开始写简历了 */
`,
`
/* 这个简历好像差点什么
 * 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
 * 简单，用开源工具翻译成 HTML 就行了
 *           3
 *           2
 *           1
 *          啦啦！
 */
`,
`
/* 再对 HTML 加点样式 */
.resumeEditor{
  padding: 2em;
}
.resumeEditor h1{
  display: block;
  width: 80px;
  margin: 0 auto;
}
.resumeEditor h2{
  display: inline-block;
  border-bottom: 1px solid;
  margin: 1em 0 .5em;
}
.resumeEditor h3{
	display: inline-block;
	margin: 0.5em 0;
}
.resumeEditor a{
	color: #000;
}
.resumeEditor ul{
	list-style: none;
}
.resumeEditor ul>li::before {
	content: "•";
	margin-left: 1em;
	margin-right: 0.5em;
}
.resumeEditor blockquote {
  margin: 1em;
  padding: .5em;
  background: #ddd;
}
/*
* I hope you enjoyed this.
*/
`];
	}

	addToStyle(char) {
		this.setState({
			style: this.state.style + char,
		});
	}

	replaceStyle(style) {
		this.setState({
			style: style,
		});
	}

	replaceStyleEditorContent() {

	}

	showStyleEditorContent(n) {
		let lastContentLength = 0;
		if (n !== 0) {lastContentLength = this.state.style.length;}
		let style = this.styleEditorContent[n];
		let len = style.length;
		return new Promise((resolve, reject) => {
			let showStyle = function () {
				let currentLen = this.state.style.length - lastContentLength;
				if (currentLen < len) {
					let char = style.substring(currentLen, currentLen+1);
					this.refs.StyleEditor.addToContent(char);
					this.addToStyle(char);
					setTimeout(showStyle, this.interval);
				} else {
					resolve();
				}
			}.bind(this);
			showStyle();
		});
	}

	showResumeContent() {
		let content = this.resumeEditorContent;
		let len = content.length;
		return new Promise((resolve, reject) => {
			let showContent = function() {
				let currentLen = this.refs.ResumeEditor.getCurrentContentLength();
				if (currentLen < len) {
					let char = content.substring(currentLen, currentLen+1);
					this.refs.ResumeEditor.addToContent(char);
					setTimeout(showContent, this.interval);
				} else {
					resolve();
				}
			}.bind(this);
			showContent();
		});
	}

	setResumeMarkdown() {
		return new Promise((resolve, reject) => {
			setTimeout(this.refs.ResumeEditor.setIsMarkdown(true), this.interval);
			resolve();
		});
	}

	async startShow() {
		await this.showStyleEditorContent(0).then(function() {console.log('done! show Content 0')});
		await this.showResumeContent();
		await this.showStyleEditorContent(1).then(function() {console.log('done! show Content 1')});
		await this.setResumeMarkdown();
		await this.showStyleEditorContent(2).then(function() {console.log('done! show Content 2')});
	}

	componentDidMount() {
		this.startShow();
		console.log(111);
		// this.refs.StyleEditor.replaceContent(this.content[0]);
		// this.replaceStyle(this.content[0]);
		// this.refs.ResumeEditor.replaceContent("");
	}

	render() {
		return (
			<div>
				<StyleEditor ref="StyleEditor" />
				<ResumeEditor ref="ResumeEditor" />
				<style>{this.state.style}</style>
			</div>);
	}
}
ReactDOM.render(<ReactClass />, document.getElementById("content"));
