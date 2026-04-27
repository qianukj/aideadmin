# AideAdmin Framework Skill

AideAdmin Framework Skill packages the framework rules as an AI-readable Codex skill for vibe coding. It guides agents to generate Go backend + React PC admin + React H5 business systems with unified API contracts, RBAC/navigation entries, installer-first database setup, customer IM, third-party storage/SMS integrations, security middleware, Docker delivery, and MIT-friendly commercial use.

官网地址：https://aideadmin.com

## 0. AI Skill 快速使用

推荐优先通过 npm 全局安装 Skill 包，然后按不同 AI Code 工具写入对应的 Skill / Rules / Instructions 位置。

```bash
npm install -g @qianukj/aideadmin-skill
aideadmin-skill install --force
```

默认安装到 `$CODEX_HOME/skills`，未设置 `CODEX_HOME` 时安装到 `~/.codex/skills`。

自定义安装目录：

```bash
aideadmin-skill install --path /path/to/skills --force
```

### 主流 AI Code 工具接入

| 工具 | 接入方式 | 推荐命令 / 文件 | 使用方式 |
| --- | --- | --- | --- |
| Codex | 原生 Skill | `aideadmin-skill install --force` | 在 Codex 中输入：`使用 aideadmin 创建文章管理模块` |
| Claude Code | 原生 Skill | `aideadmin-skill install --path ~/.claude/skills --force` | 重启后自动加载，可自然语言触发，也可用 `/aideadmin` |
| Claude Code 项目共享 | 项目 Skill | `aideadmin-skill install --path .claude/skills --force` | 把 `.claude/skills` 提交到仓库，团队成员打开项目即可复用 |
| Cursor | Project Rules | `.cursor/rules/aideadmin.mdc` | 把 Skill 核心规则写入项目规则，设置为 `Always` 或 `Agent Requested` |
| Windsurf | Workspace Rules | `.windsurf/rules/aideadmin.md` | 把框架约定写入 workspace rule，按需设置 `always_on` 或 `model_decision` |
| GitHub Copilot | Repository Instructions | `.github/copilot-instructions.md` | 把 Go 后端、React 双端、安装流程、权限模型和样式封装写入仓库级指令 |
| 通用 AI Agent | 根目录代理说明 | `AGENTS.md` | 不支持 Skill 的工具统一读取根目录规则，保留技术栈、目录、接口、权限和安全底线 |

### 快速调用提示词

```text
使用 aideadmin 创建文章管理模块：
- Go 后端生成 model / dto / repository / service / controller / route
- React PC 管理后台生成列表、筛选、表单、权限按钮
- React H5 端生成移动端列表和详情
- 自动补齐 nav-entry、权限字符、SQL migration、table_prefix 占位和接口协议
```

### 从 GitHub / Gitee 源码安装

```bash
git clone git@github.com:qianukj/aideadmin-skill.git
cd aideadmin-skill
npm install
npm link
aideadmin-skill install --force
```

Gitee 仓库同样按上述流程执行，替换为对应的 Gitee clone 地址即可。

## GitHub / Gitee / npm 发布

```bash
npm run check
npm publish --access public
git remote add origin git@github.com:qianukj/aideadmin-skill.git
git remote add gitee git@gitee.com:qianukj/aideadmin-skill.git
git push origin main --tags
git push gitee main --tags
```

## Codex 使用示例

```text
Use aideadmin to create an article management module with Go backend, React admin page, nav-entry permissions, and prefix-safe migrations.
```

---

# AideAdmin Framework 实现开发文档

本文档用于定义 AideAdmin 管理后台框架。框架定位为“给 vibe coding 专用的快速开发框架”，主要面向 AI 阅读、理解和辅助生成代码。框架围绕 Go 后端、React PC 管理后台、React H5 移动端、统一 API 协议和 RBAC 权限模型展开，目标是形成可复用、可扩展、可生成代码的业务开发底座.


## 1. 框架目标

AideAdmin 是一个面向业务系统快速开发的前后端分离管理后台框架，核心目标是：

- 后端使用 Go 提供稳定、清晰、可扩展的 REST API。

- PC 管理后台和 H5 移动端都使用 React + TypeScript + Vite 构建。

- 内置管理员、角色、顶部导航、图标卡片入口、按钮权限、系统配置、字典、文件上传、操作日志、登录日志、定时任务、数据导出等通用能力。

- 内置客服 IM 能力，支持 H5 快速接入、PC 全局浮窗、消息监测、WebSocket 实时消息和常用话术。

- 内置第三方能力接入层，统一封装腾讯云 COS、阿里云 OSS、七牛云对象存储、腾讯云短信、阿里云短信。

- 保持统一接口协议，让前端导航入口、路由、权限、列表和导出都由服务端规则驱动。

- 保持固定开发路径：建表 -> model -> repository -> service -> controller -> route -> nav-entry -> api -> page。

## 2. 框架设计约定

AideAdmin 的后台系统开发约定：

| 能力 | 设计约定 | 实现方向 |
| --- | --- | --- |
| 前后端分离 | 后端只提供 API | Go 后端只暴露 JSON API，前端独立部署 |
| 模块化 | 按管理端、公共能力、模型分层 | internal/admin 下按 controller、service、repository、dto、vo 分层 |
| 统一响应 | 固定 code、show、msg、data | response.JSON 统一输出 |
| 登录认证 | token 放在 header | JWT + Redis session 双层验证 |
| 权限认证 | 导航入口、按钮、接口权限统一建模 | RBAC + middleware 权限校验 |
| 后台 UE/UX | 黑白简约、内容优先 | 类似 ChatGPT 官方 UI 的工具体验：克制配色、清晰层级、低干扰反馈 |
| 样式封装 | 框架提供统一样式父类和基础组件 | admin、H5、安装向导和生成器页面只继承 / 组合，不重复散写样式 |
| 后台导航 | 顶部菜单栏 + 导航图标卡片 | 模块入口以卡片呈现，脱离传统权限树菜单 |
| 动态入口 | 服务端返回导航入口，前端转换路由和入口卡片 | 入口表保存分组、图标、路由、React 组件路径、权限字符 |
| 按钮权限 | 服务端返回 perms，前端权限组件 / Hook 控制 | 当前管理员权限随 user/info 返回 |
| 列表查询 | 分页、搜索、排序、导出统一协议 | common/list 定义查询协议和分页响应 |
| 导出 | 列表接口携带 export 参数 | 导出任务生成 xlsx / csv 下载地址 |
| 定时任务 | 任务统一调度和记录状态 | cron worker + 数据库任务表 |
| 客服 IM | 不作为独立导航入口，走全局浮窗 | ImMonitorProvider + WebSocket Gateway + MySQL 消息落库 |
| 第三方能力 | 业务只依赖统一接口 | storage / sms driver 适配不同云厂商 |
| 安装流程 | 首次运行不强制检查数据库连接 | 进入安装模式，配置数据库后再初始化框架 |
| 数据库规范 | 所有表名使用统一前缀 | 系统、IM 和业务模块表名都由 table_prefix 约束 |
| 安全防护 | 接口限流、请求防抖、防 SQL 注入、防刷 | Redis 限流 + 前端请求治理 + ORM 参数绑定 + 网关抗压基线 |
| 运行交付 | server、admin、h5 三端独立运行和打包 | 本地开发、生产构建、Docker 镜像和 Compose 编排都有固定命令 |
| 开源许可 | 遵循 MIT License | 免费商用、二次开发、私有部署和再分发 |

### 2.1 后台管理 UE/UX 基线

后台管理端的视觉和交互基线按黑白简约工具界面定义，参考 ChatGPT 官方 UI 的克制、清晰和内容优先表达。AI 生成任何后台页面时必须优先满足以下规则：

### 视觉系统

主色只使用黑、白、灰；边框使用浅灰线；阴影只用于浮层、抽屉和少量承载容器；状态色只用于成功、警告、错误等必要反馈。

#111111 
#FFFFFF 
#F7F7F5 
#DEDED9 

### 布局系统

一级模块使用顶部菜单栏切换；模块首页使用导航图标卡片承载功能入口；列表、表单、详情页以标题区、筛选区、内容区、操作区组织。

Top Nav 
Icon Cards 
Content First 
8px Radius 

### 交互系统

操作反馈低干扰：按钮 loading、行内错误、轻量 toast、确认弹窗只用于危险动作；客服 IM 固定为全局浮窗和消息监测，不进入独立导航。

Loading 
Inline Error 
Toast 
IM Float 

### AI 生成规则

生成页面时先声明页面目标、数据来源、权限字符和空状态；避免装饰性大图、彩色渐变、大面积深色背景和复杂动效，保证业务数据可读。

Goal 
API 
Permission 
Empty State

## 3. 技术栈

### 3.1 后端

Go 1.22+ 
Gin 1.10+ 
GORM 1.25+ 
MySQL 5.7+ / 8.0+ 
Redis 6.0+ 
WebSocket 
Viper 
Zap / slog 
Validator 
Casbin 或自研 RBAC 
Excelize 
robfig/cron 
腾讯云 COS SDK 
阿里云 OSS SDK 
七牛云 SDK 
腾讯云 SMS SDK 
阿里云 SMS SDK 

### 3.2 前端

React 19.x 
TypeScript 5.x 
Vite 6.x 
React Router 7.x 
Zustand 5.x 
Ant Design 5.x 
Ant Design Mobile 5.x 
Axios 1.x 
TanStack Query 5.x 
ECharts 5.x 

**前端原则**

PC 管理后台和 H5 移动端都使用 React，并共用接口协议、鉴权协议、权限数据和请求封装思想。可抽取 `packages/shared` 放置类型定义、请求封装、权限判断和通用工具。

## 4. 项目目录

推荐使用 monorepo，把 PC 管理后台、H5 移动端和 Go 后端放在同一个仓库里。

React PC 
**admin/**

管理后台、动态路由、权限组件

React H5 
**h5/**

移动端 Web、业务页面、共享请求

API

Go API 
**server/**

controller、service、repository、IM Gateway

Data 
**MySQL / Redis**

业务数据、token、缓存、任务状态

```text
aideadmin/
├── admin/                         # PC 管理后台 React 源码
│   └── src/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── layout/
│       ├── pages/
│       ├── router/
│       ├── stores/
│       ├── styles/
│       ├── utils/
│       └── main.tsx
├── h5/                            # H5 移动端 React 源码
│   └── src/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       ├── router/
│       ├── stores/
│       ├── styles/
│       ├── utils/
│       └── main.tsx
├── server/                        # Go 后端
│   ├── cmd/
│   │   ├── api/
│   │   └── worker/
│   ├── configs/
│   ├── internal/
│   │   ├── admin/
│   │   ├── im/
│   │   ├── common/
│   │   │   ├── sdk/
│   │   │   │   ├── storage/
│   │   │   │   └── sms/
│   │   └── model/
│   ├── migrations/
│   └── storage/
├── docker/
└── docs/
```

## 5. 后端请求生命周期

**首次运行规则**

框架首次启动不要求数据库已配置或可连接。不存在安装锁时进入安装模式，只开放安装向导、静态资源和健康检查；保存数据库配置并执行安装后，才初始化数据库连接、导入 seed 数据并启动完整后台能力。

HTTP 
Security 
Controller 
DTO 
Service 
Repository 
response.JSON 

| 层 | 职责 | 禁止事项 |
| --- | --- | --- |
| route | 注册路由、中间件分组 | 不写业务逻辑 |
| controller | 接收参数、调用 service、返回响应 | 不写复杂 SQL |
| dto | 请求字段定义和参数校验 | 不依赖数据库 |
| service | 核心业务规则、事务编排 | 不直接处理 HTTP |
| repository | 数据查询、更新、复杂条件 | 不处理权限和响应 |
| model | 数据库表结构映射 | 不放业务流程 |
| vo | 响应给前端的字段结构 | 不返回敏感字段 |

### 安全中间件

```text
Recovery
-> Trace
-> CORS
-> SecurityHeader
-> ClientIP
-> RateLimit
-> AntiReplay
-> SqlGuard
-> LoginAuth
-> AdminContext
-> Permission
-> Controller
```

| 中间件 | 能力 | 实现要点 |
| --- | --- | --- |
| RateLimit | 接口限流和防刷 | Redis Lua 令牌桶 / 滑动窗口，按 IP、账号、路由、场景组合限流 |
| AntiReplay | 重复提交和重放控制 | 写操作校验 Idempotency-Key / nonce，短 TTL 内只允许一次 |
| SqlGuard | SQL 注入风险拦截 | 检查 query/body 中明显注入 payload，记录风险日志 |
| ClientIP | 真实 IP 解析 | 只信任 trusted_proxies，避免伪造 X-Forwarded-For |

## 6. 统一接口协议

前端只识别统一响应结构：

```json
{
"code": 1,
"show": 0,
"msg": "success",
"data": {}
}
```

**1** 成功 
**0** 业务失败 
**401** 未登录或 token 失效 
**403** 无权限 
**422** 参数校验失败 
**429** 请求过于频繁 
**500** 系统异常 

### 分页响应

```json
{
"code": 1,
"show": 0,
"msg": "success",
"data": {
"lists": [],
"count": 0,
"page_no": 1,
"page_size": 15,
"extend": {}
}
}
```

### Go 响应结构

```go
type Body struct {
Code int         `json:"code"`
Show int         `json:"show"`
Msg  string      `json:"msg"`
Data interface{} `json:"data"`
}

type PageData struct {
Lists    interface{} `json:"lists"`
Count    int64       `json:"count"`
PageNo   int         `json:"page_no"`
PageSize int         `json:"page_size"`
Extend   interface{} `json:"extend,omitempty"`
}
```

## 7. 安装与首次运行流程

框架首次运行时不检查业务数据库连接。后端先判断安装状态，未安装时进入安装模式；只有用户在安装向导中写好数据库配置并确认安装后，才创建表、导入初始化数据和生成安装锁。

启动服务 
检测安装锁 
安装向导 
检测数据库 
写入配置 
初始化数据 
进入后台 

### 安装状态

不存在 `storage/install.lock` 时只加载基础配置、日志、安装路由、静态资源和健康检查，不初始化业务数据库连接池，不启动 worker。

### 安装接口

安装向导使用 `/installapi/status`、`/installapi/database/check`、`/installapi/config/save`、`/installapi/install`。

### 初始化数据

数据库表前缀由安装页面提交的 `database.table_prefix` 决定。后端校验后写入配置，安装执行器再按该前缀渲染物理表名并导入 seed。

### 幂等保护

存在安装锁后禁止再次安装；安装失败只返回失败步骤和错误摘要，不生成安装锁，不输出数据库密码和密钥。

```yaml
install:
installed: false
lock_file: storage/install.lock

database:
driver: mysql
host: 127.0.0.1
port: 3306
database: aideadmin
username: root
password: ""
charset: utf8mb4
timezone: Local
table_prefix: aide_
```

```json
{
"database": {
"host": "127.0.0.1",
"port": 3306,
"database": "aideadmin",
"username": "root",
"password": "",
"table_prefix": "aide_"
},
"admin": {
"username": "admin",
"password": "admin123456"
}
}
```

**表前缀规则**

`table_prefix` 只能来自安装页面提交参数，允许字母、数字、下划线，必须以字母开头，建议以下划线结尾。安装完成后不建议修改，必须修改时需要通过迁移脚本重命名所有物理表。

```sql
INSERT INTO {{prefix}}sys_config (`key`, `value`, `name`)
VALUES ('site.name', 'AideAdmin', '站点名称');
```

## 8. 认证与管理员上下文

后台认证模块负责确认请求身份、判断登录态、写入管理员上下文，并在进入 controller 前完成权限校验。

### 登录流程

```text
提交账号密码
-> 校验图形验证码 / 短信验证码
-> 校验账号状态
-> 校验密码 hash
-> 生成 token
-> Redis 写入会话
-> 更新最后登录时间和 IP
-> 写登录日志
-> 返回 token、管理员信息、导航入口、权限字符
```

### 登录接口

| 动作 | 方法 | 路径 | 说明 |
| --- | --- | --- | --- |
| 登录 | POST | /adminapi/login | 账号密码登录，可叠加验证码 |
| 退出 | POST | /adminapi/logout | 清理当前 token |
| 管理员信息 | GET | /adminapi/account/info | 返回管理员、角色、权限字符 |
| 导航入口 | GET | /adminapi/account/navs | 返回顶部导航和图标卡片入口 |
| 权限 | GET | /adminapi/account/perms | 返回按钮和接口权限 |

### Token 规则

```text
token: <admin-token>
version: <client-version>
terminal: admin
```

### 会话规则

Redis 保存 token 与管理员会话，支持主动退出、踢下线、修改密码后失效。默认同账号允许多端登录，可配置为单端登录。

### 安全规则

密码使用 bcrypt / argon2，登录失败 5 次 / 10 分钟触发锁定；短信验证码 300 秒有效，同手机号 60 秒 1 次。

### Redis Key

```text
auth:admin:token:{token}       # token -> admin session
auth:admin:user:{admin_id}     # admin_id -> token set
auth:admin:perm:{admin_id}     # 管理员权限缓存
auth:login:fail:{username}     # 登录失败次数
auth:captcha:{captcha_key}     # 图形验证码
auth:sms:{scene}:{mobile}      # 短信验证码
```

### 鉴权中间件顺序

```text
Recovery -> Trace -> CORS -> RequestLog -> LoginAuth -> AdminContext -> Permission -> OperateLog -> Controller
```

免登录接口只跳过 `LoginAuth` 和 `Permission`，不跳过 `Trace`、`RequestLog` 和 `Recovery`。

```text
POST /adminapi/login
GET  /adminapi/captcha
POST /adminapi/sms/send
GET  /adminapi/common/config
```

### 管理员上下文

```go
type AdminContext struct {
AdminID  uint
RoleIDs  []uint
Username string
IsRoot   bool
}
```

上下文只能由中间件写入，业务代码只读取。repository 不允许读取 HTTP 上下文。

## 9. 权限体系

本框架采用 RBAC，但后台 UX 不采用传统权限树菜单。角色绑定的是顶部导航、图标卡片入口、按钮和接口权限，服务端决定入口是否可见，接口仍通过权限字符校验。

**后台 UX 定义**

后台管理端采用黑白简约风格，类似 ChatGPT 官方 UI 的内容优先工具体验。一级模块显示在顶部菜单栏，模块首页使用导航图标卡片承载功能入口。权限表仍可命名为 `sys_menu`，但语义是“导航入口 + 权限点”。

M **顶部导航**

一级模块，显示在顶部菜单栏。

C **图标卡片**

功能入口，显示在模块首页并对应页面路由。

A **按钮**

对应按钮或接口权限。

### 入口字段设计

```sql
CREATE TABLE sys_menu (
id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
parent_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
type CHAR(1) NOT NULL COMMENT 'M顶部导航 C图标卡片 A按钮',
name VARCHAR(64) NOT NULL,
path VARCHAR(128) NOT NULL DEFAULT '',
component VARCHAR(255) NOT NULL DEFAULT '',
icon VARCHAR(64) NOT NULL DEFAULT '',
entry_desc VARCHAR(255) NOT NULL DEFAULT '',
entry_badge VARCHAR(64) NOT NULL DEFAULT '',
permission VARCHAR(128) NOT NULL DEFAULT '',
sort INT NOT NULL DEFAULT 0,
hidden TINYINT NOT NULL DEFAULT 0,
keep_alive TINYINT NOT NULL DEFAULT 0,
active_entry VARCHAR(128) NOT NULL DEFAULT '',
status TINYINT NOT NULL DEFAULT 1,
created_at DATETIME NOT NULL,
updated_at DATETIME NOT NULL,
deleted_at DATETIME NULL
);
```

### 导航入口字段

```json
{
"id": 10,
"parent_id": 0,
"type": "C",
"name": "管理员",
"path": "/permission/admin",
"component": "permission/admin/index",
"icon": "UserOutlined",
"entry_desc": "管理员账号、角色和状态维护",
"entry_badge": "",
"permission": "auth.admin/list",
"meta": {
"title": "管理员",
"hidden": false,
"activeEntry": "",
"cache": false
},
"children": []
}
```

## 10. 路由规范

后台接口统一前缀为 `/adminapi`。

| 动作 | 方法 | 路径 | 权限字符 |
| --- | --- | --- | --- |
| 列表 | GET | /adminapi/auth/admin/list | auth.admin/list |
| 详情 | GET | /adminapi/auth/admin/detail | auth.admin/detail |
| 新增 | POST | /adminapi/auth/admin/add | auth.admin/add |
| 编辑 | POST | /adminapi/auth/admin/edit | auth.admin/edit |
| 删除 | POST | /adminapi/auth/admin/delete | auth.admin/delete |
| 状态 | POST | /adminapi/auth/admin/status | auth.admin/status |
| 导出 | GET | /adminapi/auth/admin/list?export=2 | auth.admin/export |

## 11-13. DTO、列表与导出

### 参数校验 DTO

```go
type AdminCreateDTO struct {
Username string `json:"username" binding:"required,min=4,max=32"`
Password string `json:"password" binding:"required,min=6,max=32"`
Nickname string `json:"nickname" binding:"required,max=32"`
RoleIDs  []uint `json:"role_ids" binding:"required,min=1"`
Status   int    `json:"status" binding:"oneof=0 1"`
}
```

| 参数 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| page_no | int | 1 | 页码 |
| page_size | int | 15 | 每页数量 |
| keyword | string | 空 | 通用关键词 |
| sort_field | string | id | 排序字段 |
| sort_order | string | desc | asc / desc |
| export | int | 0 | 2 表示导出 |

**导出策略**

小数据量同步生成文件，大数据量创建导出任务并交给 worker 异步生成。每个导出类必须声明字段映射，避免敏感字段泄漏。

## 14. React 前端约定

PC 管理后台和 H5 移动端都使用 React。两端保持一致的工程思想、类型定义、接口协议和权限模型。

### PC 管理后台

```text
admin/src/
├── api/
├── components/
├── hooks/
├── layout/
├── pages/
├── router/
├── stores/
├── styles/
├── utils/
└── main.tsx
```

### H5 移动端

```text
h5/src/
├── api/
├── components/
├── hooks/
├── pages/
├── router/
├── stores/
├── styles/
├── utils/
└── main.tsx
```

### 样式封装标准

框架必须提供统一样式基座。业务开发、代码生成器、后台页面、H5 页面和安装向导都只能继承或组合框架样式，不允许每个页面散写一套视觉规则。

### 样式分层

`packages/ui/styles` 统一存放 token、reset、base、admin、h5、install 样式；admin 和 H5 项目只引入框架样式包。

### 设计 Token

颜色、间距、圆角、字号、阴影、z-index 必须通过 CSS 变量定义，业务页面禁止直接写新的主题色。

### 基础父类

框架保留 `aide-` 样式命名空间，页面必须继承 `aide-page`、`aide-section`、`aide-filter`、`aide-actions` 等父类。

### 父组件

页面优先使用 `DataPage`、`FormPage`、`DetailPage`、`MobilePage`、`InstallPage` 组合业务内容。

| 父类 | 用途 | 使用场景 |
| --- | --- | --- |
| aide-page | 页面根容器 | admin / H5 / install 页面 |
| aide-page__header | 标题、描述、主操作 | 列表页、表单页、详情页 |
| aide-section | 内容分区 | 筛选区、表单区、详情区 |
| aide-filter | 筛选表单容器 | 列表查询 |
| aide-actions | 操作按钮区 | 顶部操作、表格行操作 |
| aide-entry-card | 导航图标卡片 | 功能入口 |
| aide-empty | 空状态 | 无数据、无权限、未配置 |
| aide-mobile-page | H5 页面根容器 | H5 页面 |
| aide-install-page | 安装向导页面根容器 | 首次安装流程 |

```css
:root {
--aide-color-bg: #f7f7f5;
--aide-color-surface: #ffffff;
--aide-color-text: #111111;
--aide-color-muted: #5f5f5b;
--aide-color-border: #deded9;
--aide-radius-md: 8px;
--aide-space-4: 16px;
--aide-shadow-float: 0 10px 28px rgba(0, 0, 0, 0.05);
}
```

```tsx
import { DataPage } from '@aideadmin/ui'

export default function AdminListPage() {
return (
<DataPage
title="管理员"
description="管理员账号、角色和状态维护"
permission="auth.admin/list"
filter={<AdminFilter />}
actions={<AdminActions />}
table={<AdminTable />}
emptyText="暂无管理员"
/>
)
}
```

**生成器规则**

代码生成器生成 React 页面时必须使用框架父组件和 `aide-` 父类，禁止生成大段内联 style，禁止为单个页面写独立主题色、圆角、阴影和布局规则。

### 权限组件

```tsx
import { Button } from 'antd'
import { Permission } from '@/components/Permission'

export function AdminToolbar() {
return (
<>
<Permission value="auth.admin/add">
<Button type="primary">新增</Button>
</Permission>
<Permission anyOf={['auth.admin/edit', 'auth.admin/delete']}>
<Button>操作</Button>
</Permission>
</>
)
}
```

### 请求防抖和重复提交

前端请求封装必须内置防抖、请求去重、写操作幂等键和路由切换取消请求。GET 搜索默认 300ms 防抖，POST / PUT / DELETE 默认 800ms 重复提交锁。

```ts
request.post('/auth/admin/add', data, {
debounceKey: 'auth.admin.add',
debounceMs: 800,
idempotent: true,
})
```

## 15. 客服 IM 模块

客服 IM 是框架内置的全局能力，不新增独立导航入口。H5 端负责发起咨询，PC 管理后台通过全局浮窗接待会话，并由消息监测机制常驻监听未读、分配、断线重连和新消息提醒。

### H5 快速接入

业务页面加入“联系客服”入口，打开聊天页后创建或恢复会话，并建立 WebSocket 连接。

### 全局浮窗

PC 后台在主布局挂载客服浮窗和抽屉面板，不占用独立导航入口，支持会话列表、聊天窗口和快捷回复。

### 消息监测

全局 Provider 监听新消息、未读数、分配状态、连接状态和重连事件，并驱动浮窗角标与通知。

### 可靠投递

消息先落库再投递，客户端使用 client_msg_id 去重，Redis 维护在线状态和待分配队列。

### 模块目录

```text
server/internal/im/
├── gateway/
├── service/
├── repository/
├── dto/
└── vo/
```

```text
admin/src/features/im/
├── ImMonitorProvider.tsx
├── ImFloatingEntry.tsx
├── ImWorkbenchDrawer.tsx
├── hooks/
└── api/

h5/src/pages/im/
└── chat/
```

### WebSocket 连接

```text
GET /adminapi/im/ws?token=<admin-token>&terminal=admin
GET /h5api/im/ws?token=<user-token>&terminal=h5
GET /h5api/im/ws?visitor_id=<visitor-id>&terminal=h5
```

### WebSocket 消息协议

```json
{
"type": "message.send",
"request_id": "req_1700000000",
"data": {
"session_id": "s_10001",
"client_msg_id": "cmsg_1700000000",
"msg_type": "text",
"content": "你好，我想咨询订单",
"payload": {}
}
}
```

| type | 方向 | 说明 |
| --- | --- | --- |
| ping / pong | 双向 | 心跳检测 |
| session.create | client -> server | 创建或恢复会话 |
| session.assign | server -> client | 会话已分配客服 |
| message.send | client -> server | 发送消息 |
| message.push | server -> client | 推送新消息 |
| message.read | client -> server | 标记已读 |
| session.close | 双向 | 关闭会话 |

### HTTP API

| 动作 | 方法 | 路径 | 权限字符 |
| --- | --- | --- | --- |
| 会话列表 | GET | /adminapi/im/session/list | im.session/list |
| 接待会话 | POST | /adminapi/im/session/accept | im.session/accept |
| 转接会话 | POST | /adminapi/im/session/transfer | im.session/transfer |
| 关闭会话 | POST | /adminapi/im/session/close | im.session/close |
| 消息记录 | GET | /adminapi/im/message/list | im.message/list |
| 发送消息 | POST | /adminapi/im/message/send | im.message/send |
| 未读监测 | GET | /adminapi/im/monitor/unread | im.monitor/unread |
| 常用话术 | GET | /adminapi/im/reply/list | im.reply/list |

### 全局浮窗接入

```tsx
import { ImMonitorProvider } from '@/features/im/ImMonitorProvider'
import { ImFloatingEntry } from '@/features/im/ImFloatingEntry'

export function AdminLayout() {
return (
<ImMonitorProvider>
<MainLayout />
<ImFloatingEntry />
</ImMonitorProvider>
)
}
```

### 核心数据表

im_session 
im_message 
im_session_user 
im_customer_service 
im_reply_group 
im_reply 
im_blacklist 
im_event 

### H5 最小接入

```tsx
import { useNavigate } from 'react-router'

export function ContactServiceButton({ scene, orderId }: { scene: string; orderId?: number }) {
const navigate = useNavigate()

return (
<button onClick={() => navigate(`/im/chat?scene=${scene}&order_id=${orderId || ''}`)}>
联系客服
</button>
)
}
```

### 快速接入步骤

- 后端建立 `server/internal/im` 模块，创建 IM 数据库表。

- 注册 `/adminapi/im/ws`、`/h5api/im/ws` 和 HTTP API。

- 实现 WebSocket 鉴权、心跳、连接管理、消息落库和推送。

- PC 在主布局挂载 `ImMonitorProvider`、`ImFloatingEntry` 和 `ImWorkbenchDrawer` 抽屉式接待面板。

- H5 新增 `h5/src/pages/im/chat/index.tsx` 聊天页。

- 不给客服 IM 创建独立导航入口，仅给客服角色分配会话、消息、监测和话术权限。

## 16. 第三方能力接入

第三方能力统一放在 `server/internal/common/sdk` 下，业务模块只依赖框架接口，不直接调用腾讯云、阿里云或七牛云 SDK。

### 对象存储

支持本地存储、腾讯云 COS、阿里云 OSS、七牛云对象存储。统一提供上传、抓取远程资源、删除文件和生成访问地址。

### 短信服务

支持腾讯云短信、阿里云短信。统一提供模板发送、发送日志、频率限制、验证码校验和使用后失效。

### 支持驱动

| 能力 | 驱动 | 说明 |
| --- | --- | --- |
| 对象存储 | local | 本地开发和私有部署默认存储 |
| 对象存储 | tencent_cos | 腾讯云 COS |
| 对象存储 | aliyun_oss | 阿里云 OSS |
| 对象存储 | qiniu_kodo | 七牛云对象存储 |
| 短信 | tencent_sms | 腾讯云短信 |
| 短信 | aliyun_sms | 阿里云短信 |

### 后端目录

```text
server/internal/common/sdk/
├── storage/
│   ├── driver.go
│   ├── local.go
│   ├── tencent_cos.go
│   ├── aliyun_oss.go
│   └── qiniu_kodo.go
└── sms/
├── driver.go
├── tencent_sms.go
└── aliyun_sms.go
```

### 存储接口

```go
type StorageDriver interface {
Put(ctx context.Context, objectKey string, reader io.Reader, size int64, contentType string) (*FileObject, error)
Fetch(ctx context.Context, url string, objectKey string) (*FileObject, error)
Delete(ctx context.Context, objectKey string) error
PublicURL(objectKey string) string
}
```

### 短信接口

```go
type SmsDriver interface {
Send(ctx context.Context, req SmsSendRequest) (*SmsSendResult, error)
}

type SmsSendRequest struct {
Mobile     string
TemplateID string
Params     map[string]string
Scene      string
}
```

### 配置示例

```yaml
storage:
default: local
allowed_ext:
image: [jpg, jpeg, png, gif, webp]
file: [pdf, doc, docx, xls, xlsx, zip]
max_size_mb: 50
tencent_cos:
enabled: false
secret_id: ${TENCENT_COS_SECRET_ID}
secret_key: ${TENCENT_COS_SECRET_KEY}
region: ap-guangzhou
bucket: ""
aliyun_oss:
enabled: false
access_key_id: ${ALIYUN_OSS_ACCESS_KEY_ID}
access_key_secret: ${ALIYUN_OSS_ACCESS_KEY_SECRET}
endpoint: oss-cn-hangzhou.aliyuncs.com
bucket: ""
qiniu_kodo:
enabled: false
access_key: ${QINIU_ACCESS_KEY}
secret_key: ${QINIU_SECRET_KEY}
bucket: ""

sms:
default: tencent_sms
code_ttl_seconds: 300
send_interval_seconds: 60
daily_limit: 20
tencent_sms:
enabled: false
secret_id: ${TENCENT_SMS_SECRET_ID}
secret_key: ${TENCENT_SMS_SECRET_KEY}
region: ap-guangzhou
app_id: ""
sign: ""
aliyun_sms:
enabled: false
access_key_id: ${ALIYUN_SMS_ACCESS_KEY_ID}
access_key_secret: ${ALIYUN_SMS_ACCESS_KEY_SECRET}
region: cn-hangzhou
sign: ""
```

### 上传与短信 API

| 动作 | 方法 | 路径 | 权限字符 / 场景 |
| --- | --- | --- | --- |
| 上传文件 | POST | /adminapi/common/upload/file | common.upload/file |
| 上传图片 | POST | /adminapi/common/upload/image | common.upload/image |
| 删除文件 | POST | /adminapi/common/upload/delete | common.upload/delete |
| 存储配置 | GET | /adminapi/system/storage/detail | system.storage/detail |
| 保存存储配置 | POST | /adminapi/system/storage/save | system.storage/save |
| 发送短信 | POST | /adminapi/sms/send | admin_login / security_verify |
| 发送短信 | POST | /h5api/sms/send | user_login / user_bind_mobile |
| 保存短信配置 | POST | /adminapi/system/sms/save | system.sms/save |

### 安全规则

### 上传安全

上传前校验文件大小、扩展名和 MIME，服务端生成对象 key，文件信息写入 `sys_file`，私有桶通过后端签名 URL 访问。

### 短信安全

同手机号 60 秒 1 条，同手机号同场景每天最多 20 条；验证码 5 分钟有效，校验成功后标记已使用，失败超过 5 次后失效。

**接入原则**

密钥只允许从环境变量、密钥管理服务或加密配置读取；后台配置页必须脱敏展示；测试连接接口只返回成功 / 失败和错误摘要。

## 17. 数据库基础表

数据库表名由安装前缀和逻辑表名组成。安装前缀由安装页面提交的 `database.table_prefix` 决定，后端校验后写入配置，安装执行器再根据该值生成最终物理表名。文档中的 `sys_`、`im_`、`cms_` 都只是逻辑表命名空间，不是最终物理表前缀。

```text
physical_table = database.table_prefix + logical_table
```

| 类型 | 逻辑命名空间 | 物理表生成 | 说明 |
| --- | --- | --- | --- |
| 系统表 | sys_ | {table_prefix}sys_admin | 管理员、角色、配置、字典、日志 |
| 客服 IM | im_ | {table_prefix}im_session | 会话、消息、客服、话术 |
| 业务表 | cms_ / mall_ / user_ | {table_prefix}cms_article | 按业务模块划分 |

**前缀规则**

model、repository、migration 和 seed 不允许写死最终物理表名；初始化 SQL 使用 `{{prefix}}` 占位符，安装执行器按安装页面提交并写入配置的 `database.table_prefix` 渲染后执行。

第一阶段至少实现以下逻辑表，安装时按 `database.table_prefix` 生成物理表：

sys_admin -> {{prefix}}sys_admin 
sys_role -> {{prefix}}sys_role 
sys_menu -> {{prefix}}sys_menu 
sys_role_menu -> {{prefix}}sys_role_menu 
sys_admin_role -> {{prefix}}sys_admin_role 
sys_login_log -> {{prefix}}sys_login_log 
sys_operate_log -> {{prefix}}sys_operate_log 
sys_config -> {{prefix}}sys_config 
sys_dict_type -> {{prefix}}sys_dict_type 
sys_dict_data -> {{prefix}}sys_dict_data 
sys_file -> {{prefix}}sys_file 
sys_sms_log -> {{prefix}}sys_sms_log 
sys_sms_code -> {{prefix}}sys_sms_code 
sys_cron_task -> {{prefix}}sys_cron_task 
sys_export_task -> {{prefix}}sys_export_task 
im_session -> {{prefix}}im_session 
im_message -> {{prefix}}im_message 
im_customer_service -> {{prefix}}im_customer_service 
im_reply -> {{prefix}}im_reply 

```sql
id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
created_at DATETIME NOT NULL,
updated_at DATETIME NOT NULL,
deleted_at DATETIME NULL
```

## 18-21. 日志、配置、定时任务与错误处理

### 日志规范

记录 trace_id、method、path、status、latency、client_ip、admin_id、user_agent、脱敏后的 request_body 和 response_code。

### 配置规范

配置放在 `server/configs/config.example.yaml` 和 `config.local.yaml`，生产密钥不进入仓库。

### 定时任务

系统任务和业务任务统一由 worker 执行，任务定义保存到 `sys_cron_task`。

### 错误处理

业务错误统一使用 `errors.BizError`，service 返回错误，不直接写 HTTP 响应。

```yaml
app:
name: aideadmin
env: local
port: 8080
url_prefix: adminapi

database:
driver: mysql
host: 127.0.0.1
port: 3306
database: aideadmin
username: root
password: password
charset: utf8mb4
timezone: Local
table_prefix: aide_
dsn: root:password@tcp(127.0.0.1:3306)/aideadmin?charset=utf8mb4&parseTime=True&loc=Local

redis:
addr: 127.0.0.1:6379
password: ""
db: 0

storage:
default: local
local:
root: storage/upload
public_url: /uploads

sms:
default: tencent_sms
code_ttl_seconds: 300
send_interval_seconds: 60

security:
trusted_proxies:
- 127.0.0.1
rate_limit:
enabled: true
driver: redis
default:
capacity: 120
refill_rate: 60
window_seconds: 60
routes:
- pattern: /adminapi/login
capacity: 10
window_seconds: 60
dimensions: [ip, account]
- pattern: /adminapi/sms/send
capacity: 1
window_seconds: 60
dimensions: [ip, mobile, scene]
- pattern: /adminapi/*/export
capacity: 3
window_seconds: 60
dimensions: [admin_id, route]
anti_replay:
enabled: true
nonce_ttl_seconds: 300
idempotency_ttl_seconds: 600
sql_guard:
enabled: true
log_only: false
```

## 22. 开发一个业务模块的标准流程

- 建表 `cms_article`，补齐通用字段。

- 新建 model：`internal/model/cms_article.go`。

- 新建 DTO：`internal/admin/dto/article_dto.go`。

- 新建 VO：`internal/admin/vo/article_vo.go`。

- 新建 repository：封装列表、详情、创建、更新、删除。

- 新建 service：处理业务规则和事务。

- 新建 controller：绑定参数，调用 service。

- 在 route 中注册接口。

- PC 管理后台新增 `admin/src/api/cms/article.ts` 和 `admin/src/pages/cms/article/index.tsx`。

- 如 H5 需要该业务，新增 `h5/src/api/cms/article.ts` 和 `h5/src/pages/cms/article/index.tsx`。

- 后台导航入口中新增顶部导航、图标卡片和按钮权限。

- 给角色分配权限并补充测试。

## 23. 代码生成器规划

第二阶段实现代码生成器，根据数据表和模块配置生成 Go 后端与 React 前端骨架。

### 输入

数据表名、模块名、业务名、列表字段、搜索字段、表单字段、权限字符前缀。

### 输出

Go model、dto、vo、repository、service、controller、route，React PC / H5 页面，基于 `@aideadmin/ui` 父组件和 `aide-` 父类的样式骨架，客服 IM 全局浮窗接入模板、存储 / 短信配置表单和导航入口 SQL。

**生成器样式要求**

生成 React 页面时必须继承框架样式基座，不允许生成独立主题和大段内联 style；业务局部样式只能基于 token 扩展。

## 24. 第一阶段实现里程碑

Milestone 1 **基础服务**

Go 项目初始化、配置、MySQL、Redis、Gin、统一响应、异常恢复和请求日志。

Milestone 2 **认证权限**

管理员登录、token 校验、管理员上下文、顶部导航、图标卡片、角色、RBAC、React 权限组件 / Hook。

Milestone 3 **通用后台能力**

系统配置、字典、上传、第三方存储、短信验证码、操作日志、登录日志、客服 IM、列表查询和 Excel 导出。

Milestone 4 **工程增强**

定时任务、代码生成器、Docker 部署、OpenAPI 文档、单元测试和接口测试。

## 25-26. 命名规范与安全要求

### Go 命名

包名小写，文件名 snake_case，DTO 以 DTO 结尾，VO 以 VO 或 Item 结尾。

### API 命名

路径使用小写和 `/`，权限字符使用模块点号 + 动作斜杠，例如 `auth.admin/add`。

### 数据库命名

物理表名统一追加安装页面提交的 `database.table_prefix`；系统逻辑命名空间 `sys_`，IM 逻辑命名空间 `im_`，业务表按模块逻辑命名空间，字段使用 snake_case。

### 安全要求

密码哈希存储，登录限频，token 存 Redis，上传校验，第三方密钥脱敏，短信限流，导出字段白名单，生产环境关闭调试接口。

### 安全防护能力

### 接口限流

RateLimitMiddleware 使用 Redis Lua 实现令牌桶或滑动窗口，按 IP、用户、路由、场景组合限流，命中后统一返回 429 和 retry_after。

### 请求防抖

前端搜索默认 300ms 防抖，写操作默认 800ms 重复提交锁；写请求自动携带 Idempotency-Key，服务端 TTL 内只处理一次。

### 防 SQL 注入

repository 必须使用参数绑定和字段白名单；排序字段、筛选字段、导出字段不能直接来自请求参数；SqlGuard 只做前置风险拦截。

### 防刷 / 抗 DDoS 基线

应用层提供黑灰名单、请求体大小限制、高成本接口降级和短时封禁；真实大流量 DDoS 依赖 CDN、WAF、负载均衡和云厂商清洗。

```text
CDN / WAF / Cloud Anti-DDoS
-> Load Balancer
-> Nginx rate_limit / body limit
-> Go RateLimitMiddleware
-> Controller
```

**SQL 安全底线**

禁止拼接用户输入生成 SQL；模糊搜索统一 escape，排序字段和排序方向必须经过白名单转换。

## 27-30. 本地运行、三端打包与 Docker

框架按三端组织运行和交付：Go 后端 `server`、PC 管理后台 `admin`、H5 移动端 `h5`。三端都必须具备本地开发命令、生产打包命令和 Docker 镜像构建方式。

### 本地开发运行

### server

```bash
cd server
cp configs/config.example.yaml configs/config.local.yaml
go mod tidy
go run ./cmd/api
```

worker 单独运行：`go run ./cmd/worker`。

### admin

```bash
cd admin
pnpm install
cp .env.example .env.local
pnpm dev --host 0.0.0.0 --port 5173
```

### h5

```bash
cd h5
pnpm install
cp .env.example .env.local
pnpm dev --host 0.0.0.0 --port 5174
```

### 联调顺序

先启动 MySQL / Redis，再启动 server。未安装时进入安装向导，完成数据库配置和初始化后，再启动 admin 与 h5 联调。

### 三端生产打包

### server

```bash
cd server
go test ./...
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -trimpath -ldflags="-s -w" -o ../dist/server/aideadmin-api ./cmd/api
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -trimpath -ldflags="-s -w" -o ../dist/server/aideadmin-worker ./cmd/worker
```

### admin / h5

```bash
cd admin
pnpm install --frozen-lockfile
pnpm lint
pnpm build

cd ../h5
pnpm install --frozen-lockfile
pnpm lint
pnpm build
```

### Docker 打包

```bash
docker build -f docker/api.Dockerfile -t aideadmin-api:latest .
docker build -f docker/worker.Dockerfile -t aideadmin-worker:latest .
docker build -f docker/admin.Dockerfile -t aideadmin-web:latest .
docker build -f docker/h5.Dockerfile -t aideadmin-h5-web:latest .
```

### Docker 运行

```bash
docker run -d --name aideadmin-api \
-p 8080:8080 \
-v ./server/configs/config.local.yaml:/app/configs/config.local.yaml \
-v ./server/storage:/app/storage \
aideadmin-api:latest

docker run -d --name aideadmin-web -p 8081:80 aideadmin-web:latest
docker run -d --name aideadmin-h5-web -p 8082:80 aideadmin-h5-web:latest
```

### Compose 编排

```bash
docker compose -f docker/compose.yaml up -d
docker compose -f docker/compose.yaml logs -f api
docker compose -f docker/compose.yaml down
```

**运行要求**

`server/storage` 必须挂载持久化卷，保存上传、导出、日志和安装锁；`config.local.yaml` 通过挂载或环境变量注入，不打进镜像；生产环境建议放在 HTTPS、WAF、CDN 或负载均衡之后。

## 31. 开源许可

AideAdmin Framework 遵循 MIT License，允许免费商用、二次开发、私有化部署、修改源码、复制、分发和再授权。

### 允许

免费商用、二次开发、私有部署、修改源码、复制、分发和再授权。

### 要求

保留 MIT License 版权声明和许可声明。框架按 MIT License 原样提供，不对使用结果作担保。

## 32. 后续文档拆分建议

```text
docs/
├── architecture.md          # 架构设计
├── api-contract.md          # 接口协议
├── rbac.md                  # 权限设计
├── frontend.md              # 前端开发规范
├── backend.md               # 后端开发规范
├── database.md              # 数据库规范
├── im.md                    # 客服 IM 接入文档
├── third-party.md           # 第三方存储和短信接入文档
├── generator.md             # 代码生成器设计
└── deployment.md            # 部署文档
```
