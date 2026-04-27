const sections = Array.from(document.querySelectorAll(".doc-section[id]"));
const navContainers = document.querySelectorAll("[data-doc-nav]");
const STORAGE_KEY = "aideadmin-docs-lang";
const HAN_RE = /[\u3400-\u9fff]/u;
const TRANSLATABLE_ATTRIBUTES = ["alt", "aria-label", "placeholder", "content", "data-search", "description", "emptyText", "title"];

const translations = {
  zh: {
    htmlLang: "zh-CN",
    title: "AideAdmin Framework 文档",
    search: "搜索文档",
    searchLabel: "搜索文档",
    searchPlaceholder: "输入关键词，例如 RBAC、导出、React、DTO",
    languageSwitch: "语言切换",
    close: "关闭",
    menuTitle: "文档目录",
    menuOpen: "打开目录",
    menuClose: "关闭目录",
    copy: "复制",
    copied: "已复制",
    copyFailed: "复制失败",
    noResults: "没有找到匹配章节",
    sidebarSubTitle: "Framework Docs",
    zhSwitch: "中",
    enSwitch: "EN",
    sectionTitles: {
      "skill-quickstart": "0. AI Skill 快速使用",
      goals: "1. 框架目标",
      "design-rules": "2. 框架设计约定",
      stack: "3. 技术栈",
      architecture: "4. 项目目录",
      "request-lifecycle": "5. 后端请求生命周期",
      "api-contract": "6. 统一接口协议",
      "install-flow": "7. 安装与首次运行流程",
      auth: "8. 认证与管理员上下文",
      rbac: "9. 权限体系",
      routing: "10. 路由规范",
      "dto-list-export": "11-13. DTO、列表与导出",
      "react-frontend": "14. React 前端约定",
      "customer-im": "15. 客服 IM 模块",
      "third-party-integrations": "16. 第三方能力接入",
      database: "17. 数据库基础表",
      ops: "18-21. 日志、配置、定时任务与错误处理",
      "business-flow": "22. 开发一个业务模块的标准流程",
      generator: "23. 代码生成器规划",
      milestones: "24. 第一阶段实现里程碑",
      "naming-security": "25-26. 命名规范与安全要求",
      "dev-build-docker": "27-30. 本地运行、三端打包与 Docker",
      license: "31. 开源许可",
      "docs-split": "32. 后续文档拆分建议",
    },
    staticText: {
      heroTitle: "面向业务系统的 Go + React 管理后台框架",
      heroSlogan: "给 vibe coding 专用的快速开发框架",
      heroDesc:
        "用固定目录、接口协议、权限模型、SDK 接入和前端约定，把业务系统开发整理成 AI 容易读取、推理和生成的工程上下文。后端使用 Go，PC 管理后台和 H5 移动端统一使用 React。",
      heroPrimary: "查看架构设计",
      heroSecondary: "查看开发流程",
    },
  },
  en: {
    htmlLang: "en",
    title: "AideAdmin Framework Docs",
    search: "Search docs",
    searchLabel: "Search docs",
    searchPlaceholder: "Search RBAC, export, React, DTO",
    languageSwitch: "Language switch",
    close: "Close",
    menuTitle: "Docs Menu",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    copy: "Copy",
    copied: "Copied",
    copyFailed: "Copy failed",
    noResults: "No matching sections",
    sidebarSubTitle: "Framework Docs",
    zhSwitch: "ZH",
    enSwitch: "EN",
    sectionTitles: {
      "skill-quickstart": "0. AI Skill Quick Start",
      goals: "1. Framework Goals",
      "design-rules": "2. Design Rules",
      stack: "3. Tech Stack",
      architecture: "4. Project Structure",
      "request-lifecycle": "5. Backend Request Lifecycle",
      "api-contract": "6. API Contract",
      "install-flow": "7. Installation and First Run",
      auth: "8. Authentication and Admin Context",
      rbac: "9. Permission Model",
      routing: "10. Routing Rules",
      "dto-list-export": "11-13. DTO, List, and Export",
      "react-frontend": "14. React Frontend Rules",
      "customer-im": "15. Customer IM Module",
      "third-party-integrations": "16. Third-party Integrations",
      database: "17. Database Base Tables",
      ops: "18-21. Logs, Config, Cron, and Errors",
      "business-flow": "22. Standard Business Module Workflow",
      generator: "23. Code Generator Plan",
      milestones: "24. Phase One Milestones",
      "naming-security": "25-26. Naming and Security Rules",
      "dev-build-docker": "27-30. Local Run, Build, and Docker",
      license: "31. License",
      "docs-split": "32. Documentation Split Plan",
    },
    staticText: {
      heroTitle: "Go + React Admin Framework for Business Systems",
      heroSlogan: "A rapid development framework for vibe coding",
      heroDesc:
        "It standardizes directories, API contracts, permission models, SDK integrations, and frontend rules so AI can read, reason about, and generate business systems. The backend uses Go, while both PC admin and H5 use React.",
      heroPrimary: "Architecture",
      heroSecondary: "Workflow",
    },
  },
};

const chineseTerms = {
  "0. AI Skill 快速使用": "0. AI Skill Quick Start",
  "AideAdmin Framework 已封装为 AI Skill，优先给 Codex / Claude Code 这类原生 Skill 软件使用；Cursor、Windsurf、GitHub Copilot 等工具可通过 Rules / Instructions / AGENTS.md 方式接入同一套框架约定。":
    "AideAdmin Framework has been packaged as an AI Skill. Use it first with native Skill tools such as Codex and Claude Code; Cursor, Windsurf, GitHub Copilot, and similar tools can connect to the same framework rules through Rules, Instructions, or AGENTS.md.",
  "官网地址：": "Website: ",
  "官网": "Website",
  "推荐安装": "Recommended Install",
  "全局安装 npm 包后执行安装命令，默认写入": "Install the npm package globally, then run the installer. It writes to",
  "未设置": "When",
  "时写入": "is not set, it writes to",
  "工具": "Tool",
  "接入方式": "Integration",
  "推荐命令 / 文件": "Recommended Command / File",
  "使用提示": "Usage Hint",
  "原生 Skill": "Native Skill",
  "在 Codex 中直接说：使用 aideadmin 生成业务模块。":
    "In Codex, say: use aideadmin to generate a business module.",
  "个人 Skill 放": "Personal Skills go in",
  "项目 Skill 放": "Project Skills go in",
  "把 Skill 核心规则写入规则文件，设置为 Always 或 Agent Requested。":
    "Write the core Skill rules into a rule file and set it to Always or Agent Requested.",
  "复杂多文件能力可作为 Skill，常规框架约定建议写入 workspace rule。":
    "Complex multi-file capabilities can remain Skills; regular framework conventions should be written as workspace rules.",
  "把框架约定写入仓库级指令，Copilot Chat 会自动带入上下文。":
    "Write framework rules into repository instructions so Copilot Chat automatically includes them in context.",
  "通用 AI Agent": "Generic AI Agent",
  "不支持 Skill 的工具统一读取根目录代理说明。":
    "Tools without Skill support should read the root AGENTS.md.",
  "主流工具快速接入": "Mainstream Tool Quick Integration",
  "使用时直接输入：使用": "When using it, type: use",
  "创建文章管理模块。": "to create an article management module.",
  "项目共享": "Project shared",
  "重启 Claude Code 后自动加载；可用自然语言触发，也可用":
    "Restart Claude Code to load it automatically; trigger it with natural language, or call",
  "直接调用。": "directly.",
  "把 Skill 的核心规则写入 Project Rules，适合团队共享后台框架规范。":
    "Write the Skill core rules into Project Rules for team-shared admin framework conventions.",
  "使用 workspace rule 承载框架约定；如需要脚本和参考文件，再保留 skill 目录作为附件上下文。":
    "Use workspace rules for framework conventions; keep the skill directory as attached context when scripts and references are needed.",
  "把“Go 后端 + React 双端 + 安装流程 + 权限模型 + 样式封装”写入仓库指令。":
    "Write \"Go backend + React dual frontends + installer flow + permission model + style encapsulation\" into repository instructions.",
  "通用 AGENTS.md": "Generic AGENTS.md",
  "给不支持 Skill 的 AI Code 工具使用，保留最短规则：技术栈、目录、接口协议、权限和安全底线。":
    "For AI Code tools without Skill support, keep the shortest rules in AGENTS.md: stack, directories, API contract, permissions, and security baseline.",
  "AI Skill 快速使用 Codex Claude Code Cursor Windsurf GitHub Copilot AGENTS npm install aideadmin-skill":
    "AI Skill quick start Codex Claude Code Cursor Windsurf GitHub Copilot AGENTS npm install aideadmin-skill",
  "AideAdmin Framework 是给 vibe coding 专用的 Go + React 快速开发框架，面向 AI 阅读和协作生成，覆盖 RBAC、顶部导航、图标卡片入口、统一响应、客服 IM、第三方存储短信、导出、日志和代码生成规划。":
    "AideAdmin Framework is a Go + React rapid development framework for vibe coding. It is designed for AI reading and collaborative generation, covering RBAC, top navigation, icon-card entries, unified responses, customer IM, third-party storage and SMS, exports, logs, and code generator planning.",
  "用固定目录、接口协议、权限模型、SDK 接入和前端约定，把业务系统开发整理成 AI 容易读取、推理和生成的工程上下文。后端使用 Go，PC 管理后台和 H5 移动端统一使用 React。":
    "It organizes business system development into an engineering context that AI can read, reason about, and generate through fixed directories, API contracts, permission models, SDK integrations, and frontend rules. The backend uses Go, while PC admin and H5 both use React.",
  "AideAdmin 是一个面向业务系统快速开发的前后端分离管理后台框架，核心目标是：":
    "AideAdmin is a frontend-backend separated admin framework for rapid business system development. Its core goals are:",
  "后端使用 Go 提供稳定、清晰、可扩展的 REST API。": "Use Go on the backend to provide stable, clear, and extensible REST APIs.",
  "PC 管理后台和 H5 移动端都使用 React + TypeScript + Vite 构建。":
    "Build both the PC admin and H5 mobile frontend with React + TypeScript + Vite.",
  "内置管理员、角色、顶部导航、图标卡片入口、按钮权限、系统配置、字典、文件上传、操作日志、登录日志、定时任务、数据导出等通用能力。":
    "Provide common capabilities including admins, roles, top navigation, icon-card entries, button permissions, system config, dictionaries, file upload, operation logs, login logs, cron tasks, and data export.",
  "内置客服 IM 能力，支持 H5 快速接入、PC 全局浮窗、消息监测、WebSocket 实时消息和常用话术。":
    "Include customer IM capabilities with quick H5 integration, a PC global floating dock, message monitoring, WebSocket realtime messages, and quick replies.",
  "内置第三方能力接入层，统一封装腾讯云 COS、阿里云 OSS、七牛云对象存储、腾讯云短信、阿里云短信。":
    "Include a third-party integration layer that uniformly wraps Tencent Cloud COS, Alibaba Cloud OSS, Qiniu object storage, Tencent Cloud SMS, and Alibaba Cloud SMS.",
  "保持统一接口协议，让前端导航入口、路由、权限、列表和导出都由服务端规则驱动。":
    "Keep one API contract so frontend navigation entries, routes, permissions, lists, and exports are driven by server rules.",
  "保持固定开发路径：建表 -> model -> repository -> service -> controller -> route -> nav-entry -> api -> page。":
    "Keep a fixed development path: table -> model -> repository -> service -> controller -> route -> nav-entry -> api -> page.",
  "AideAdmin 的后台系统开发约定：": "AideAdmin admin development rules:",
  "后台管理端的视觉和交互基线按黑白简约工具界面定义，参考 ChatGPT 官方 UI 的克制、清晰和内容优先表达。AI 生成任何后台页面时必须优先满足以下规则：":
    "The admin visual and interaction baseline uses a black-and-white minimalist tool interface, following the restrained, clear, content-first expression of the official ChatGPT UI. Any AI-generated admin page must first satisfy these rules:",
  "主色只使用黑、白、灰；边框使用浅灰线；阴影只用于浮层、抽屉和少量承载容器；状态色只用于成功、警告、错误等必要反馈。":
    "Use only black, white, and gray as primary colors. Use light gray borders. Use shadows only for floating layers, drawers, and a few container surfaces. Use status colors only for required success, warning, and error feedback.",
  "一级模块使用顶部菜单栏切换；模块首页使用导航图标卡片承载功能入口；列表、表单、详情页以标题区、筛选区、内容区、操作区组织。":
    "Switch first-level modules through the top menu. Use navigation icon cards on module home pages. Organize list, form, and detail pages into header, filter, content, and action areas.",
  "操作反馈低干扰：按钮 loading、行内错误、轻量 toast、确认弹窗只用于危险动作；客服 IM 固定为全局浮窗和消息监测，不进入独立导航。":
    "Keep operation feedback low-interruption: button loading, inline errors, lightweight toasts, and confirmation dialogs only for risky actions. Customer IM stays as a global floating dock and message monitor, not an independent navigation item.",
  "生成页面时先声明页面目标、数据来源、权限字符和空状态；避免装饰性大图、彩色渐变、大面积深色背景和复杂动效，保证业务数据可读。":
    "When generating pages, declare the page goal, data source, permission string, and empty state first. Avoid decorative large images, colorful gradients, large dark backgrounds, and complex motion so business data stays readable.",
  "PC 管理后台和 H5 移动端都使用 React，并共用接口协议、鉴权协议、权限数据和请求封装思想。可抽取":
    "Both PC admin and H5 use React and share the API contract, auth contract, permission data, and request wrapper approach. Extract",
  "放置类型定义、请求封装、权限判断和通用工具。": "for type definitions, request wrappers, permission checks, and shared utilities.",
  "推荐使用 monorepo，把 PC 管理后台、H5 移动端和 Go 后端放在同一个仓库里。":
    "Use a monorepo and place the PC admin, H5 mobile frontend, and Go backend in the same repository.",
  "框架首次启动不要求数据库已配置或可连接。不存在安装锁时进入安装模式，只开放安装向导、静态资源和健康检查；保存数据库配置并执行安装后，才初始化数据库连接、导入 seed 数据并启动完整后台能力。":
    "The framework does not require the database to be configured or reachable on first startup. When the install lock does not exist, it enters install mode and only exposes the installer, static assets, and health checks. It initializes the database connection, imports seed data, and starts full admin capabilities only after database config is saved and installation is executed.",
  "前端只识别统一响应结构：": "The frontend only recognizes this unified response shape:",
  "框架首次运行时不检查业务数据库连接。后端先判断安装状态，未安装时进入安装模式；只有用户在安装向导中写好数据库配置并确认安装后，才创建表、导入初始化数据和生成安装锁。":
    "On first run, the framework does not check the business database connection. The backend checks install status first and enters install mode if not installed. Tables are created, seed data is imported, and the install lock is generated only after the user saves database config and confirms installation in the installer.",
  "不存在": "When missing",
  "时只加载基础配置、日志、安装路由、静态资源和健康检查，不初始化业务数据库连接池，不启动 worker。":
    ", only base config, logs, install routes, static assets, and health checks are loaded. Business database pools are not initialized and workers are not started.",
  "安装向导使用": "The installer uses",
  "数据库表前缀由安装页面提交的": "The database table prefix is submitted by the installer through",
  "决定。后端校验后写入配置，安装执行器再按该前缀渲染物理表名并导入 seed。":
    ". The backend validates it, writes it to config, and the installer renders physical table names with that prefix before importing seeds.",
  "存在安装锁后禁止再次安装；安装失败只返回失败步骤和错误摘要，不生成安装锁，不输出数据库密码和密钥。":
    "Re-installation is blocked after the install lock exists. Failed installs only return the failed step and error summary, do not generate the lock, and never output database passwords or secrets.",
  "只能来自安装页面提交参数，允许字母、数字、下划线，必须以字母开头，建议以下划线结尾。安装完成后不建议修改，必须修改时需要通过迁移脚本重命名所有物理表。":
    "can only come from the installer form. It may contain letters, numbers, and underscores, must start with a letter, and should end with an underscore. Changing it after installation is not recommended; if required, use a migration script to rename all physical tables.",
  "后台认证模块负责确认请求身份、判断登录态、写入管理员上下文，并在进入 controller 前完成权限校验。":
    "The admin auth module verifies request identity, checks login state, writes the admin context, and completes permission checks before entering controllers.",
  "Redis 保存 token 与管理员会话，支持主动退出、踢下线、修改密码后失效。默认同账号允许多端登录，可配置为单端登录。":
    "Redis stores tokens and admin sessions, supports active logout, forced logout, and invalidation after password changes. Multi-device login is allowed by default and can be configured as single-session login.",
  "密码使用 bcrypt / argon2，登录失败 5 次 / 10 分钟触发锁定；短信验证码 300 秒有效，同手机号 60 秒 1 次。":
    "Passwords use bcrypt or argon2. Five login failures within ten minutes trigger a lock. SMS codes are valid for 300 seconds and limited to one send per mobile number per 60 seconds.",
  "免登录接口只跳过": "Public endpoints only skip",
  "不跳过": "and do not skip",
  "上下文只能由中间件写入，业务代码只读取。repository 不允许读取 HTTP 上下文。":
    "The context can only be written by middleware and read by business code. Repositories must not read HTTP context.",
  "本框架采用 RBAC，但后台 UX 不采用传统权限树菜单。角色绑定的是顶部导航、图标卡片入口、按钮和接口权限，服务端决定入口是否可见，接口仍通过权限字符校验。":
    "The framework uses RBAC, but the admin UX does not use a traditional permission tree menu. Roles bind top navigation, icon-card entries, buttons, and API permissions. The server decides entry visibility, while APIs still validate permission strings.",
  "后台管理端采用黑白简约风格，类似 ChatGPT 官方 UI 的内容优先工具体验。一级模块显示在顶部菜单栏，模块首页使用导航图标卡片承载功能入口。权限表仍可命名为":
    "The admin side uses a black-and-white minimalist style, similar to the content-first tool experience of the official ChatGPT UI. First-level modules are shown in the top menu, and module home pages use navigation icon cards for entries. The permission table may still be named",
  "但语义是“导航入口 + 权限点”。": "but its meaning is \"navigation entry + permission point\".",
  "一级模块，显示在顶部菜单栏。": "First-level module displayed in the top menu.",
  "功能入口，显示在模块首页并对应页面路由。": "Feature entry displayed on the module home page and mapped to a page route.",
  "对应按钮或接口权限。": "Maps to button or API permissions.",
  "后台接口统一前缀为": "Admin APIs use the unified prefix",
  "小数据量同步生成文件，大数据量创建导出任务并交给 worker 异步生成。每个导出类必须声明字段映射，避免敏感字段泄漏。":
    "Small exports generate files synchronously. Large exports create tasks and hand them to workers for async generation. Each export class must declare field mappings to avoid leaking sensitive fields.",
  "PC 管理后台和 H5 移动端都使用 React。两端保持一致的工程思想、类型定义、接口协议和权限模型。":
    "Both PC admin and H5 use React. Both sides keep the same engineering approach, type definitions, API contract, and permission model.",
  "框架必须提供统一样式基座。业务开发、代码生成器、后台页面、H5 页面和安装向导都只能继承或组合框架样式，不允许每个页面散写一套视觉规则。":
    "The framework must provide a unified style foundation. Business development, the code generator, admin pages, H5 pages, and the installer can only inherit or compose framework styles. Pages must not scatter their own visual rules.",
  "统一存放 token、reset、base、admin、h5、install 样式；admin 和 H5 项目只引入框架样式包。":
    "stores token, reset, base, admin, h5, and install styles. Admin and H5 projects only import the framework style package.",
  "颜色、间距、圆角、字号、阴影、z-index 必须通过 CSS 变量定义，业务页面禁止直接写新的主题色。":
    "Colors, spacing, radius, font sizes, shadows, and z-index values must be defined through CSS variables. Business pages must not hardcode new theme colors.",
  "框架保留": "The framework reserves the",
  "样式命名空间，页面必须继承": "style namespace. Pages must inherit",
  "等父类。": "base classes.",
  "页面优先使用": "Pages should prefer",
  "组合业务内容。": "to compose business content.",
  "代码生成器生成 React 页面时必须使用框架父组件和": "When generating React pages, the code generator must use framework parent components and",
  "父类，禁止生成大段内联 style，禁止为单个页面写独立主题色、圆角、阴影和布局规则。":
    "base classes. It must not generate large inline styles or page-specific theme colors, radii, shadows, or layout rules.",
  "前端请求封装必须内置防抖、请求去重、写操作幂等键和路由切换取消请求。GET 搜索默认 300ms 防抖，POST / PUT / DELETE 默认 800ms 重复提交锁。":
    "Frontend request wrappers must include debounce, request deduplication, idempotency keys for write operations, and request cancellation on route changes. GET search uses 300ms debounce by default; POST / PUT / DELETE use an 800ms duplicate-submit lock by default.",
  "客服 IM 是框架内置的全局能力，不新增独立导航入口。H5 端负责发起咨询，PC 管理后台通过全局浮窗接待会话，并由消息监测机制常驻监听未读、分配、断线重连和新消息提醒。":
    "Customer IM is a built-in global capability and does not add an independent navigation entry. H5 starts consultations, while the PC admin receives sessions through a global floating dock. A message monitor continuously watches unread counts, assignments, reconnects, and new-message reminders.",
  "业务页面加入“联系客服”入口，打开聊天页后创建或恢复会话，并建立 WebSocket 连接。":
    "Business pages add a \"Contact support\" entry. After opening the chat page, the client creates or restores the session and establishes a WebSocket connection.",
  "PC 后台在主布局挂载客服浮窗和抽屉面板，不占用独立导航入口，支持会话列表、聊天窗口和快捷回复。":
    "The PC admin mounts the support floating dock and drawer panel in the main layout. It does not occupy an independent navigation entry and supports session lists, chat windows, and quick replies.",
  "全局 Provider 监听新消息、未读数、分配状态、连接状态和重连事件，并驱动浮窗角标与通知。":
    "The global Provider listens for new messages, unread counts, assignment state, connection state, and reconnect events, then drives floating dock badges and notifications.",
  "消息先落库再投递，客户端使用 client_msg_id 去重，Redis 维护在线状态和待分配队列。":
    "Messages are stored before delivery. Clients deduplicate by client_msg_id, and Redis maintains online state plus the pending assignment queue.",
  "后端建立": "Create the backend",
  "模块，创建 IM 数据库表。": "module and create IM database tables.",
  "和 HTTP API。": "and HTTP APIs.",
  "实现 WebSocket 鉴权、心跳、连接管理、消息落库和推送。":
    "Implement WebSocket auth, heartbeat, connection management, message persistence, and push delivery.",
  "PC 在主布局挂载": "On PC, mount",
  "抽屉式接待面板。": "as a drawer-style reception panel in the main layout.",
  "H5 新增": "Add",
  "聊天页。": "chat page for H5.",
  "不给客服 IM 创建独立导航入口，仅给客服角色分配会话、消息、监测和话术权限。":
    "Do not create an independent navigation entry for customer IM. Only assign session, message, monitoring, and reply permissions to support roles.",
  "第三方能力统一放在": "Third-party capabilities are placed under",
  "下，业务模块只依赖框架接口，不直接调用腾讯云、阿里云或七牛云 SDK。":
    ". Business modules only depend on framework interfaces and do not directly call Tencent Cloud, Alibaba Cloud, or Qiniu SDKs.",
  "支持本地存储、腾讯云 COS、阿里云 OSS、七牛云对象存储。统一提供上传、抓取远程资源、删除文件和生成访问地址。":
    "Support local storage, Tencent Cloud COS, Alibaba Cloud OSS, and Qiniu object storage. Provide unified upload, remote fetch, delete, and public URL generation.",
  "支持腾讯云短信、阿里云短信。统一提供模板发送、发送日志、频率限制、验证码校验和使用后失效。":
    "Support Tencent Cloud SMS and Alibaba Cloud SMS. Provide unified template sending, send logs, rate limits, code verification, and invalidation after use.",
  "上传前校验文件大小、扩展名和 MIME，服务端生成对象 key，文件信息写入": "Before upload, validate file size, extension, and MIME type. The server generates the object key and writes file metadata to",
  "私有桶通过后端签名 URL 访问。": "Private buckets are accessed through backend-signed URLs.",
  "同手机号 60 秒 1 条，同手机号同场景每天最多 20 条；验证码 5 分钟有效，校验成功后标记已使用，失败超过 5 次后失效。":
    "Limit each mobile number to one SMS per 60 seconds and at most 20 per scene per day. Verification codes are valid for five minutes, are marked used after success, and expire after more than five failures.",
  "密钥只允许从环境变量、密钥管理服务或加密配置读取；后台配置页必须脱敏展示；测试连接接口只返回成功 / 失败和错误摘要。":
    "Secrets may only be read from environment variables, secret management services, or encrypted config. Admin config pages must mask secrets. Test-connection APIs only return success or failure plus an error summary.",
  "数据库表名由安装前缀和逻辑表名组成。安装前缀由安装页面提交的": "Database table names are composed from the install prefix and logical table name. The install prefix is submitted by the installer through",
  "决定，后端校验后写入配置，安装执行器再根据该值生成最终物理表名。文档中的":
    ", validated by the backend, written to config, and then used by the installer to generate final physical table names. In this document,",
  "都只是逻辑表命名空间，不是最终物理表前缀。": "are only logical table namespaces, not final physical table prefixes.",
  "model、repository、migration 和 seed 不允许写死最终物理表名；初始化 SQL 使用":
    "Models, repositories, migrations, and seeds must not hardcode final physical table names. Initialization SQL uses",
  "占位符，安装执行器按安装页面提交并写入配置的": "placeholders. The installer renders them with the",
  "渲染后执行。": "value submitted by the installer and written to config before execution.",
  "第一阶段至少实现以下逻辑表，安装时按": "Phase one implements at least these logical tables. During installation,",
  "生成物理表：": "is used to generate physical tables:",
  "记录 trace_id、method、path、status、latency、client_ip、admin_id、user_agent、脱敏后的 request_body 和 response_code。":
    "Record trace_id, method, path, status, latency, client_ip, admin_id, user_agent, masked request_body, and response_code.",
  "配置放在": "Put config in",
  "生产密钥不进入仓库。": "Production secrets must not enter the repository.",
  "系统任务和业务任务统一由 worker 执行，任务定义保存到": "System tasks and business tasks are executed by workers. Task definitions are saved in",
  "业务错误统一使用": "Business errors use",
  "service 返回错误，不直接写 HTTP 响应。": "uniformly. Services return errors and do not write HTTP responses directly.",
  "框架按三端组织运行和交付：Go 后端": "The framework runs and ships as three surfaces: Go backend",
  "三端都必须具备本地开发命令、生产打包命令和 Docker 镜像构建方式。":
    "All three surfaces must provide local development commands, production build commands, and Docker image build methods.",
  "先启动 MySQL / Redis，再启动 server。未安装时进入安装向导，完成数据库配置和初始化后，再启动 admin 与 h5 联调。":
    "Start MySQL and Redis first, then start the server. If not installed, enter the installer. After database configuration and initialization are complete, start admin and h5 for integration testing.",
  "worker 单独运行：": "Run the worker separately:",
  "必须挂载持久化卷，保存上传、导出、日志和安装锁；": "must mount a persistent volume for uploads, exports, logs, and the install lock.",
  "通过挂载或环境变量注入，不打进镜像；生产环境建议放在 HTTPS、WAF、CDN 或负载均衡之后。":
    "should be injected through a mounted file or environment variables and must not be baked into the image. In production, place the service behind HTTPS, WAF, CDN, or a load balancer.",
  "AideAdmin Framework 遵循 MIT License，允许免费商用、二次开发、私有化部署、修改源码、复制、分发和再授权。":
    "AideAdmin Framework follows the MIT License and allows free commercial use, secondary development, private deployment, source modification, copying, distribution, and sublicensing.",
  "免费商用、二次开发、私有部署、修改源码、复制、分发和再授权。":
    "Free commercial use, secondary development, private deployment, source modification, copying, distribution, and sublicensing.",
  "保留 MIT License 版权声明和许可声明。框架按 MIT License 原样提供，不对使用结果作担保。":
    "Keep the MIT License copyright and permission notices. The framework is provided as-is under the MIT License, without warranty for usage outcomes.",
  "第二阶段实现代码生成器，根据数据表和模块配置生成 Go 后端与 React 前端骨架。":
    "Phase two implements a code generator that creates Go backend and React frontend skeletons from table and module configuration.",
  "数据表名、模块名、业务名、列表字段、搜索字段、表单字段、权限字符前缀。":
    "Table name, module name, business name, list fields, search fields, form fields, and permission string prefix.",
  "Go model、dto、vo、repository、service、controller、route，React PC / H5 页面，基于":
    "Go model, dto, vo, repository, service, controller, route, React PC / H5 pages, plus style skeletons based on",
  "父组件和": "parent components and",
  "父类的样式骨架，客服 IM 全局浮窗接入模板、存储 / 短信配置表单和导航入口 SQL。":
    "base classes, customer IM global floating dock integration templates, storage / SMS config forms, and navigation entry SQL.",
  "生成 React 页面时必须继承框架样式基座，不允许生成独立主题和大段内联 style；业务局部样式只能基于 token 扩展。":
    "Generated React pages must inherit the framework style foundation. Independent themes and large inline styles are not allowed; local business styles can only extend tokens.",
  "Go 项目初始化、配置、MySQL、Redis、Gin、统一响应、异常恢复和请求日志。":
    "Go project initialization, config, MySQL, Redis, Gin, unified responses, panic recovery, and request logs.",
  "管理员登录、token 校验、管理员上下文、顶部导航、图标卡片、角色、RBAC、React 权限组件 / Hook。":
    "Admin login, token validation, admin context, top navigation, icon cards, roles, RBAC, and React permission components / hooks.",
  "系统配置、字典、上传、第三方存储、短信验证码、操作日志、登录日志、客服 IM、列表查询和 Excel 导出。":
    "System config, dictionaries, upload, third-party storage, SMS verification codes, operation logs, login logs, customer IM, list queries, and Excel export.",
  "定时任务、代码生成器、Docker 部署、OpenAPI 文档、单元测试和接口测试。":
    "Cron tasks, code generator, Docker deployment, OpenAPI docs, unit tests, and API tests.",
  "包名小写，文件名 snake_case，DTO 以 DTO 结尾，VO 以 VO 或 Item 结尾。":
    "Package names are lowercase. File names use snake_case. DTO types end with DTO, and VO types end with VO or Item.",
  "路径使用小写和": "Paths use lowercase letters and",
  "权限字符使用模块点号 + 动作斜杠，例如": "Permission strings use module dot + action slash, for example",
  "物理表名统一追加安装页面提交的": "Physical table names uniformly append the",
  "系统逻辑命名空间": "System logical namespace",
  "IM 逻辑命名空间": "IM logical namespace",
  "业务表按模块逻辑命名空间，字段使用 snake_case。": "Business tables use module logical namespaces, and fields use snake_case.",
  "密码哈希存储，登录限频，token 存 Redis，上传校验，第三方密钥脱敏，短信限流，导出字段白名单，生产环境关闭调试接口。":
    "Store password hashes, rate-limit login, store tokens in Redis, validate uploads, mask third-party secrets, rate-limit SMS, whitelist export fields, and disable debug endpoints in production.",
  "RateLimitMiddleware 使用 Redis Lua 实现令牌桶或滑动窗口，按 IP、用户、路由、场景组合限流，命中后统一返回 429 和 retry_after。":
    "RateLimitMiddleware uses Redis Lua to implement a token bucket or sliding window. It rate-limits by IP, user, route, and scene combinations, returning 429 and retry_after on hits.",
  "前端搜索默认 300ms 防抖，写操作默认 800ms 重复提交锁；写请求自动携带 Idempotency-Key，服务端 TTL 内只处理一次。":
    "Frontend search uses 300ms debounce by default. Write operations use an 800ms duplicate-submit lock. Write requests automatically carry Idempotency-Key, and the server handles them only once within the TTL.",
  "repository 必须使用参数绑定和字段白名单；排序字段、筛选字段、导出字段不能直接来自请求参数；SqlGuard 只做前置风险拦截。":
    "Repositories must use parameter binding and field allowlists. Sort fields, filter fields, and export fields must not come directly from request parameters. SqlGuard only performs pre-risk interception.",
  "应用层提供黑灰名单、请求体大小限制、高成本接口降级和短时封禁；真实大流量 DDoS 依赖 CDN、WAF、负载均衡和云厂商清洗。":
    "The application layer provides black/gray lists, request body limits, high-cost API degradation, and short-term bans. Real large-scale DDoS defense relies on CDN, WAF, load balancing, and cloud-provider traffic scrubbing.",
  "禁止拼接用户输入生成 SQL；模糊搜索统一 escape，排序字段和排序方向必须经过白名单转换。":
    "Never concatenate user input into SQL. Fuzzy search must be escaped uniformly, and sort fields plus sort directions must be converted through allowlists.",
  "建表": "Create table",
  "补齐通用字段": "complete common fields",
  "新建 model：": "Create model:",
  "新建 DTO：": "Create DTO:",
  "新建 VO：": "Create VO:",
  "新建 repository：封装列表、详情、创建、更新、删除。": "Create repository: wrap list, detail, create, update, and delete.",
  "新建 service：处理业务规则和事务。": "Create service: handle business rules and transactions.",
  "新建 controller：绑定参数，调用 service。": "Create controller: bind parameters and call the service.",
  "在 route 中注册接口。": "Register APIs in route.",
  "PC 管理后台新增": "Add to PC admin",
  "如 H5 需要该业务，新增": "If H5 needs this business feature, add",
  "后台导航入口中新增顶部导航、图标卡片和按钮权限。": "Add top navigation, icon cards, and button permissions to admin navigation entries.",
  "给角色分配权限并补充测试。": "Assign permissions to roles and add tests.",
  "AideAdmin 文档首页": "AideAdmin docs home",
  "公司 logo": "Company logo",
  "打开目录": "Open menu",
  "关闭目录": "Close menu",
  "移动端目录": "Mobile menu",
  "文档目录": "Docs menu",
  "搜索文档": "Search docs",
  "输入关键词，例如 RBAC、导出、React、DTO": "Search RBAC, export, React, DTO",
  "框架摘要": "Framework summary",
  "AideAdmin 管理后台界面预览": "AideAdmin admin console preview",
  "导航图标卡片预览": "Navigation icon card preview",
  "客服 IM 全局浮窗预览": "Customer IM global floating dock preview",
  "框架关键能力": "Key framework capabilities",
  "框架架构图": "Framework architecture diagram",
  "安装流程": "Install flow",
  "后端请求生命周期": "Backend request lifecycle",
  "面向业务系统的 Go + React 管理后台框架": "Go + React Admin Framework for Business Systems",
  "给 vibe coding 专用的快速开发框架": "A rapid development framework for vibe coding",
  "查看架构设计": "Architecture",
  "查看开发流程": "Workflow",
  "工作台": "Workspace",
  "总览": "Overview",
  "业务": "Business",
  "系统": "System",
  "报表": "Reports",
  "运维": "Operations",
  "导航图标卡片": "Navigation Icon Cards",
  "权限中心": "Permission Center",
  "系统配置": "System Config",
  "第三方接入": "Third-party Integration",
  "数据导出": "Data Export",
  "统一协议": "Unified Contract",
  "权限点": "Permission Points",
  "IM 未读": "IM Unread",
  "全局浮窗": "Global Dock",
  "模块": "Module",
  "状态": "Status",
  "协议": "Contract",
  "启用": "Enabled",
  "监测中": "Monitoring",
  "多驱动": "Multi-driver",
  "统一响应": "Unified Response",
  "客服浮窗": "Support Dock",
  "3 条新消息": "3 new messages",
  "AI 可读约定": "AI-readable Rules",
  "目录、协议、权限、SDK 都以固定格式描述，方便 AI 理解和生成。":
    "Directories, contracts, permissions, and SDKs are described in fixed formats so AI can understand and generate them.",
  "统一 API 协议": "Unified API Contract",
  "code、show、msg、data 保持前后端一致。": "code, show, msg, and data stay consistent between frontend and backend.",
  "RBAC 权限模型": "RBAC Permission Model",
  "顶部导航、图标卡片、按钮和接口权限统一由服务端分发。":
    "Top navigation, icon cards, buttons, and API permissions are all distributed by the server.",
  "React 双端": "React for Both Frontends",
  "PC 管理后台和 H5 共享工程思想与类型定义。": "PC admin and H5 share engineering rules and type definitions.",
  "对象存储和短信统一驱动，业务代码不绑定云厂商。": "Object storage and SMS use unified drivers so business code is not bound to any cloud vendor.",
  "客服 IM": "Customer IM",
  "H5 快速接入在线客服，PC 使用全局浮窗接待。": "H5 can quickly integrate online support, while PC receives sessions through a global dock.",
  "能力": "Capability",
  "设计约定": "Design Rule",
  "实现方向": "Implementation Direction",
  "前后端分离": "Frontend-backend separation",
  "后端只提供 API": "Backend only provides APIs",
  "Go 后端只暴露 JSON API，前端独立部署": "Go backend only exposes JSON APIs; frontends are deployed independently",
  "模块化": "Modularization",
  "按管理端、公共能力、模型分层": "Layer by admin, common capabilities, and models",
  "统一输出": "unified output",
  "登录认证": "Login authentication",
  "token 放在 header": "Token is placed in headers",
  "双层验证": "two-layer validation",
  "权限认证": "Permission authentication",
  "导航入口、按钮、接口权限统一建模": "Model navigation entries, buttons, and API permissions together",
  "权限校验": "permission check",
  "后台 UE/UX": "Admin UE/UX",
  "黑白简约、内容优先": "Black-and-white minimalism, content first",
  "类似 ChatGPT 官方 UI 的工具体验：克制配色、清晰层级、低干扰反馈":
    "A ChatGPT-like tool experience: restrained colors, clear hierarchy, and low-interruption feedback",
  "样式封装": "Style encapsulation",
  "框架提供统一样式父类和基础组件": "The framework provides unified style base classes and base components",
  "admin、H5、安装向导和生成器页面只继承 / 组合，不重复散写样式":
    "admin, H5, installer, and generator pages only inherit or compose styles instead of scattering duplicate styles",
  "后台导航": "Admin navigation",
  "顶部菜单栏 + 导航图标卡片": "Top menu + navigation icon cards",
  "模块入口以卡片呈现，脱离传统权限树菜单": "Module entries are displayed as cards instead of a traditional permission-tree menu",
  "动态入口": "Dynamic entries",
  "服务端返回导航入口，前端转换路由和入口卡片": "The server returns navigation entries; the frontend converts them into routes and entry cards",
  "入口表保存分组、图标、路由、React 组件路径、权限字符": "The entry table stores groups, icons, routes, React component paths, and permission strings",
  "按钮权限": "Button permissions",
  "服务端返回 perms，前端权限组件 / Hook 控制": "The server returns perms; frontend Permission components / hooks control visibility",
  "当前管理员权限随 user/info 返回": "Current admin permissions are returned with user/info",
  "列表查询": "List queries",
  "分页、搜索、排序、导出统一协议": "Pagination, search, sorting, and export share one contract",
  "common/list 定义查询协议和分页响应": "common/list defines the query contract and pagination response",
  "导出": "Export",
  "列表接口携带 export 参数": "List APIs carry an export parameter",
  "导出任务生成 xlsx / csv 下载地址": "Export tasks generate xlsx / csv download URLs",
  "定时任务": "Cron tasks",
  "任务统一调度和记录状态": "Tasks are scheduled uniformly and status is recorded",
  "数据库任务表": "database task table",
  "不作为独立导航入口，走全局浮窗": "Not an independent navigation entry; use the global dock",
  "消息落库": "message persistence",
  "第三方能力": "Third-party capabilities",
  "业务只依赖统一接口": "Business code only depends on unified interfaces",
  "适配不同云厂商": "adapts different cloud vendors",
  "首次运行不强制检查数据库连接": "Do not force database connection checks on first run",
  "进入安装模式，配置数据库后再初始化框架": "Enter install mode and initialize the framework only after database config is set",
  "数据库规范": "Database rules",
  "所有表名使用统一前缀": "All table names use one prefix",
  "系统、IM 和业务模块表名都由 table_prefix 约束": "System, IM, and business module table names are constrained by table_prefix",
  "安全防护": "Security protection",
  "接口限流、请求防抖、防 SQL 注入、防刷": "API rate limiting, request debounce, SQL injection prevention, and anti-abuse",
  "Redis 限流 + 前端请求治理 + ORM 参数绑定 + 网关抗压基线": "Redis rate limits + frontend request governance + ORM parameter binding + gateway pressure baseline",
  "运行交付": "Runtime delivery",
  "server、admin、h5 三端独立运行和打包": "server, admin, and h5 run and build independently",
  "本地开发、生产构建、Docker 镜像和 Compose 编排都有固定命令": "Local development, production builds, Docker images, and Compose orchestration all have fixed commands",
  "开源许可": "Open-source license",
  "遵循 MIT License": "Follow the MIT License",
  "免费商用、二次开发、私有部署和再分发": "Free commercial use, secondary development, private deployment, and redistribution",
  "后台管理 UE/UX 基线": "Admin UE/UX Baseline",
  "视觉系统": "Visual System",
  "布局系统": "Layout System",
  "交互系统": "Interaction System",
  "AI 生成规则": "AI Generation Rules",
  "技术栈": "Tech Stack",
  "后端": "Backend",
  "前端": "Frontend",
  "前端原则": "Frontend Principle",
  "Casbin 或自研 RBAC": "Casbin or custom RBAC",
  "腾讯云 COS SDK": "Tencent Cloud COS SDK",
  "阿里云 OSS SDK": "Alibaba Cloud OSS SDK",
  "七牛云 SDK": "Qiniu Cloud SDK",
  "腾讯云 SMS SDK": "Tencent Cloud SMS SDK",
  "阿里云 SMS SDK": "Alibaba Cloud SMS SDK",
  "项目目录": "Project Structure",
  "管理后台、动态路由、权限组件": "Admin console, dynamic routes, permission components",
  "移动端 Web、业务页面、共享请求": "Mobile web, business pages, shared requests",
  "业务数据、token、缓存、任务状态": "Business data, tokens, cache, task state",
  "PC 管理后台 React 源码": "React PC admin source",
  "H5 移动端 React 源码": "React H5 source",
  "Go 后端": "Go backend",
  "后端请求生命周期": "Backend Request Lifecycle",
  "首次运行规则": "First-run Rule",
  "层": "Layer",
  "职责": "Responsibility",
  "禁止事项": "Forbidden",
  "注册路由、中间件分组": "Register routes and middleware groups",
  "不写业务逻辑": "No business logic",
  "接收参数、调用 service、返回响应": "Receive parameters, call service, return response",
  "不写复杂 SQL": "No complex SQL",
  "请求字段定义和参数校验": "Request field definitions and parameter validation",
  "不依赖数据库": "No database dependency",
  "核心业务规则、事务编排": "Core business rules and transaction orchestration",
  "不直接处理 HTTP": "Do not handle HTTP directly",
  "数据查询、更新、复杂条件": "Data queries, updates, and complex conditions",
  "不处理权限和响应": "Do not handle permissions or responses",
  "数据库表结构映射": "Database table mapping",
  "不放业务流程": "Do not place business workflows",
  "响应给前端的字段结构": "Response field shape for frontend",
  "不返回敏感字段": "Do not return sensitive fields",
  "安全中间件": "Security Middleware",
  "中间件": "Middleware",
  "实现要点": "Implementation Notes",
  "接口限流和防刷": "API rate limiting and anti-abuse",
  "Redis Lua 令牌桶 / 滑动窗口，按 IP、账号、路由、场景组合限流":
    "Redis Lua token bucket / sliding window, rate-limited by IP, account, route, and scene",
  "重复提交和重放控制": "Duplicate-submit and replay control",
  "写操作校验 Idempotency-Key / nonce，短 TTL 内只允许一次":
    "Write operations validate Idempotency-Key / nonce and only allow one execution within a short TTL",
  "SQL 注入风险拦截": "SQL injection risk interception",
  "检查 query/body 中明显注入 payload，记录风险日志": "Inspect query/body for obvious injection payloads and record risk logs",
  "真实 IP 解析": "Real IP resolution",
  "只信任 trusted_proxies，避免伪造 X-Forwarded-For": "Only trust trusted_proxies to avoid forged X-Forwarded-For",
  "状态码": "Status codes",
  "响应结构": "response shape",
  "成功": "Success",
  "业务失败": "Business failure",
  "未登录或 token 失效": "Not logged in or token expired",
  "无权限": "No permission",
  "参数校验失败": "Parameter validation failed",
  "请求过于频繁": "Too many requests",
  "系统异常": "System error",
  "分页响应": "Paginated Response",
  "Go 响应结构": "Go Response Structs",
  "安装与首次运行流程": "Installation and First Run",
  "启动服务": "Start service",
  "检测安装锁": "Check install lock",
  "安装向导": "Installer",
  "检测数据库": "Check database",
  "写入配置": "Write config",
  "初始化数据": "Initialize data",
  "进入后台": "Enter admin",
  "安装状态": "Install Status",
  "安装接口": "Install APIs",
  "初始化数据": "Initial Data",
  "幂等保护": "Idempotency Protection",
  "表前缀规则": "Table Prefix Rule",
  "站点名称": "Site name",
  "认证与管理员上下文": "Authentication and Admin Context",
  "登录流程": "Login Flow",
  "提交账号密码": "Submit account and password",
  "校验图形验证码 / 短信验证码": "Validate captcha / SMS code",
  "校验账号状态": "Validate account status",
  "校验密码 hash": "Validate password hash",
  "生成 token": "Generate token",
  "Redis 写入会话": "Write session to Redis",
  "更新最后登录时间和 IP": "Update last login time and IP",
  "写登录日志": "Write login log",
  "返回 token、管理员信息、导航入口、权限字符": "Return token, admin info, navigation entries, and permission strings",
  "登录接口": "Login APIs",
  "动作": "Action",
  "方法": "Method",
  "路径": "Path",
  "说明": "Description",
  "登录": "Login",
  "账号密码登录，可叠加验证码": "Account/password login, captcha can be added",
  "退出": "Logout",
  "清理当前 token": "Clear current token",
  "管理员信息": "Admin info",
  "返回管理员、角色、权限字符": "Return admin, roles, and permission strings",
  "导航入口": "Navigation entries",
  "返回顶部导航和图标卡片入口": "Return top navigation and icon-card entries",
  "权限": "Permissions",
  "返回按钮和接口权限": "Return button and API permissions",
  "会话规则": "Session Rules",
  "安全规则": "Security Rules",
  "管理员权限缓存": "admin permission cache",
  "登录失败次数": "login failure count",
  "图形验证码": "captcha",
  "短信验证码": "SMS code",
  "鉴权中间件顺序": "Auth Middleware Order",
  "管理员上下文": "Admin Context",
  "权限体系": "Permission Model",
  "后台 UX 定义": "Admin UX Definition",
  "顶部导航": "Top Navigation",
  "图标卡片": "Icon Card",
  "按钮": "Button",
  "入口字段设计": "Entry Field Design",
  "M顶部导航 C图标卡片 A按钮": "M top nav C icon card A button",
  "导航入口字段": "Navigation Entry Fields",
  "管理员账号、角色和状态维护": "Admin accounts, roles, and status maintenance",
  "路由规范": "Routing Rules",
  "列表": "List",
  "详情": "Detail",
  "新增": "Create",
  "编辑": "Edit",
  "删除": "Delete",
  "参数校验 DTO": "Parameter Validation DTO",
  "参数": "Parameter",
  "类型": "Type",
  "默认": "Default",
  "页码": "Page number",
  "每页数量": "Items per page",
  "空": "Empty",
  "通用关键词": "General keyword",
  "排序字段": "Sort field",
  "2 表示导出": "2 means export",
  "导出策略": "Export Strategy",
  "React 前端约定": "React Frontend Rules",
  "PC 管理后台": "PC Admin",
  "H5 移动端": "H5 Mobile",
  "样式封装标准": "Style Encapsulation Standard",
  "样式分层": "Style Layers",
  "设计 Token": "Design Tokens",
  "基础父类": "Base Classes",
  "父组件": "Parent Components",
  "用途": "Purpose",
  "使用场景": "Use Case",
  "页面根容器": "Page root container",
  "admin / H5 / install 页面": "admin / H5 / install pages",
  "标题、描述、主操作": "Title, description, primary actions",
  "列表页、表单页、详情页": "List, form, and detail pages",
  "内容分区": "Content section",
  "筛选区、表单区、详情区": "Filter, form, and detail areas",
  "筛选表单容器": "Filter form container",
  "操作按钮区": "Action button area",
  "顶部操作、表格行操作": "Top actions and table row actions",
  "功能入口": "Feature entry",
  "空状态": "Empty state",
  "无数据、无权限、未配置": "No data, no permission, or not configured",
  "H5 页面根容器": "H5 page root container",
  "H5 页面": "H5 page",
  "安装向导页面根容器": "Installer page root container",
  "首次安装流程": "First install flow",
  "暂无管理员": "No admins yet",
  "生成器规则": "Generator Rule",
  "权限组件": "Permission Component",
  "操作": "Action",
  "请求防抖和重复提交": "Request Debounce and Duplicate Submit",
  "客服 IM 模块": "Customer IM Module",
  "H5 快速接入": "H5 Quick Integration",
  "消息监测": "Message Monitoring",
  "可靠投递": "Reliable Delivery",
  "模块目录": "Module Directories",
  "WebSocket 连接": "WebSocket Connection",
  "WebSocket 消息协议": "WebSocket Message Contract",
  "你好，我想咨询订单": "Hello, I need help with an order",
  "方向": "Direction",
  "心跳检测": "Heartbeat",
  "创建或恢复会话": "Create or restore session",
  "会话已分配客服": "Session assigned to support",
  "发送消息": "Send message",
  "推送新消息": "Push new message",
  "标记已读": "Mark as read",
  "关闭会话": "Close session",
  "会话列表": "Session list",
  "接待会话": "Accept session",
  "转接会话": "Transfer session",
  "消息记录": "Message records",
  "未读监测": "Unread monitor",
  "常用话术": "Quick replies",
  "全局浮窗接入": "Global Dock Integration",
  "核心数据表": "Core Data Tables",
  "H5 最小接入": "H5 Minimal Integration",
  "联系客服": "Contact support",
  "快速接入步骤": "Quick Integration Steps",
  "第三方能力接入": "Third-party Integrations",
  "对象存储": "Object Storage",
  "短信服务": "SMS Service",
  "支持驱动": "Supported Drivers",
  "驱动": "Driver",
  "本地开发和私有部署默认存储": "Default storage for local development and private deployment",
  "腾讯云 COS": "Tencent Cloud COS",
  "阿里云 OSS": "Alibaba Cloud OSS",
  "七牛云对象存储": "Qiniu Object Storage",
  "短信": "SMS",
  "腾讯云短信": "Tencent Cloud SMS",
  "阿里云短信": "Alibaba Cloud SMS",
  "后端目录": "Backend Directory",
  "存储接口": "Storage Interface",
  "短信接口": "SMS Interface",
  "配置示例": "Config Example",
  "上传与短信 API": "Upload and SMS APIs",
  "权限字符 / 场景": "Permission String / Scene",
  "上传文件": "Upload file",
  "上传图片": "Upload image",
  "删除文件": "Delete file",
  "存储配置": "Storage config",
  "保存存储配置": "Save storage config",
  "发送短信": "Send SMS",
  "保存短信配置": "Save SMS config",
  "上传安全": "Upload Security",
  "短信安全": "SMS Security",
  "接入原则": "Integration Principle",
  "数据库基础表": "Database Base Tables",
  "逻辑命名空间": "Logical Namespace",
  "物理表生成": "Physical Table Generation",
  "系统表": "System tables",
  "管理员、角色、配置、字典、日志": "Admins, roles, config, dictionaries, logs",
  "会话、消息、客服、话术": "Sessions, messages, support agents, replies",
  "业务表": "Business tables",
  "按业务模块划分": "Separated by business module",
  "前缀规则": "Prefix Rule",
  "日志、配置、定时任务与错误处理": "Logs, Config, Cron, and Error Handling",
  "日志规范": "Log Rules",
  "配置规范": "Config Rules",
  "错误处理": "Error Handling",
  "业务模块": "Business module",
  "开发流程": "Development workflow",
  "开发一个业务模块的标准流程": "Standard Workflow for a Business Module",
  "代码生成器规划": "Code Generator Plan",
  "输入": "Input",
  "输出": "Output",
  "生成器样式要求": "Generator Style Requirements",
  "第一阶段实现里程碑": "Phase One Milestones",
  "里程碑": "Milestones",
  "基础服务": "Base Services",
  "认证权限": "Auth and Permissions",
  "通用后台能力": "Common Admin Capabilities",
  "工程增强": "Engineering Enhancements",
  "命名规范与安全要求": "Naming and Security Rules",
  "Go 命名": "Go Naming",
  "API 命名": "API Naming",
  "数据库命名": "Database Naming",
  "安全要求": "Security Requirements",
  "安全防护能力": "Security Capabilities",
  "接口限流": "API Rate Limiting",
  "请求防抖": "Request Debounce",
  "防 SQL 注入": "SQL Injection Prevention",
  "防刷 / 抗 DDoS 基线": "Anti-abuse / Anti-DDoS Baseline",
  "SQL 安全底线": "SQL Security Baseline",
  "本地运行、三端打包与 Docker": "Local Run, Three-surface Build, and Docker",
  "本地开发运行": "Local Development Run",
  "联调顺序": "Integration Order",
  "三端生产打包": "Three-surface Production Build",
  "Docker 打包": "Docker Build",
  "Docker 运行": "Docker Run",
  "Compose 编排": "Compose Orchestration",
  "运行要求": "Runtime Requirements",
  "允许": "Allowed",
  "要求": "Requirements",
  "后续文档拆分建议": "Documentation Split Plan",
  "架构设计": "Architecture design",
  "接口协议": "API contract",
  "权限设计": "Permission design",
  "前端开发规范": "Frontend development rules",
  "后端开发规范": "Backend development rules",
  "数据库规范": "Database rules",
  "客服 IM 接入文档": "Customer IM integration docs",
  "第三方存储和短信接入文档": "Third-party storage and SMS integration docs",
  "代码生成器设计": "Code generator design",
  "部署文档": "Deployment docs",
  "文档": "Docs",
  "管理员": "Admin",
  "中": "ZH",
  "权": "P",
  "配": "C",
  "云": "S",
  "导": "E",
  "关闭": "Close",
  "1. 框架目标": "1. Framework Goals",
  "2. 框架设计约定": "2. Design Rules",
  "6. 统一接口协议": "6. API Contract",
  "11-13. DTO、列表与导出": "11-13. DTO, List, and Export",
  "Token 规则": "Token Rules",
  "权限字符": "Permission String",
  "父类": "Base Classes",
  "双向": "Bidirectional",
  "注册": "Register",
  "internal/admin 下按 controller、service、repository、dto、vo 分层":
    "Layer internal/admin by controller, service, repository, dto, and vo",
  "固定 code、show、msg、data": "Fixed code, show, msg, and data",
  "和": "and",
  '"name": "管理员"': '"name": "Admin"',
  '"title": "管理员"': '"title": "Admin"',
  'title="管理员"': 'title="Admin"',
  '&lt;Button type="primary"&gt;新增&lt;/Button&gt;': '&lt;Button type="primary"&gt;Create&lt;/Button&gt;',
  '&lt;Button&gt;操作&lt;/Button&gt;': '&lt;Button&gt;Action&lt;/Button&gt;',
  "框架目标 Go React REST API 管理员 角色 顶部导航 图标卡片 功能入口 权限 配置 字典 上传 日志 导出 客服IM 第三方存储 短信":
    "framework goals Go React REST API admin role top navigation icon card feature entry permission config dictionary upload log export customer IM third-party storage SMS",
  "框架设计约定 前后端分离 模块化 统一响应 顶部导航 图标卡片 导航入口 功能入口 按钮权限 lists 导出 定时任务 第三方能力 storage sms":
    "design rules frontend backend separation modular unified response top navigation icon card navigation entry feature entry button permission lists export cron third-party capability storage sms",
  "技术栈 Go Gin GORM MySQL Redis Viper Zap React TypeScript Vite Zustand Ant Design TanStack Query 腾讯云 COS 阿里云 OSS 七牛 短信":
    "tech stack Go Gin GORM MySQL Redis Viper Zap React TypeScript Vite Zustand Ant Design TanStack Query Tencent Cloud COS Alibaba Cloud OSS Qiniu SMS",
  "请求生命周期 Gin Router Recovery Trace Cors Login Permission Controller DTO Service Repository response":
    "request lifecycle Gin Router Recovery Trace Cors Login Permission Controller DTO Service Repository response",
  "统一接口协议 code show msg data PageData 状态码 分页 响应结构":
    "unified API contract code show msg data PageData status code pagination response shape",
  "安装 首次运行 数据库配置 安装向导 installapi install.lock 初始化数据 seed table_prefix":
    "installation first run database config installer installapi install.lock initial data seed table_prefix",
  "认证 token JWT Redis 管理员上下文 AdminContext 登录 退出 踢下线 图形验证码 短信验证码 鉴权 中间件":
    "auth token JWT Redis admin context AdminContext login logout forced logout captcha SMS code authentication middleware",
  "RBAC 权限 管理员 角色 顶部导航 图标卡片 导航入口 按钮 接口 权限字符 auth.admin/list":
    "RBAC permission admin role top navigation icon card navigation entry button API permission string auth.admin/list",
  "路由规范 adminapi list detail add edit delete status export 权限字符":
    "routing rules adminapi list detail add edit delete status export permission string",
  "DTO 参数校验 列表查询 page_no page_size export 数据导出 Excel xlsx csv":
    "DTO parameter validation list query page_no page_size export data export Excel xlsx csv",
  "React 前端 PC H5 Vite Axios Ant Design Mobile Zustand TanStack Query 权限组件 Hook":
    "React frontend PC H5 Vite Axios Ant Design Mobile Zustand TanStack Query permission component Hook",
  "客服 IM 在线客服 WebSocket 会话 消息 常用话术 全局浮窗 消息监测 H5 快速接入":
    "customer IM online support WebSocket session message quick replies global dock message monitoring H5 quick integration",
  "第三方能力 腾讯云 COS 阿里云 OSS 七牛云 Kodo 对象存储 storage sms 腾讯云短信 阿里云短信 短信验证码 上传 SDK":
    "third-party capability Tencent Cloud COS Alibaba Cloud OSS Qiniu Kodo object storage storage sms Tencent Cloud SMS Alibaba Cloud SMS SMS code upload SDK",
  "数据库 基础表 sys_admin sys_role sys_menu sys_config sys_file sys_sms_log sys_sms_code sys_cron_task sys_export_task im_session im_message":
    "database base tables sys_admin sys_role sys_menu sys_config sys_file sys_sms_log sys_sms_code sys_cron_task sys_export_task im_session im_message",
  "日志 配置 定时任务 错误处理 BizError 操作日志 登录日志 yaml worker storage sms 密钥":
    "logs config cron error handling BizError operation log login log yaml worker storage sms secrets",
  "业务模块 开发流程 建表 model dto vo repository service controller route nav-entry 导航入口 图标卡片 api page":
    "business module development workflow table model dto vo repository service controller route nav-entry navigation entry icon card api page",
  "代码生成器 生成 Go model dto vo repository service controller React PC H5 导航入口 图标卡片 SQL 存储 短信配置":
    "code generator generate Go model dto vo repository service controller React PC H5 navigation entry icon card SQL storage SMS config",
  "里程碑 基础服务 认证权限 通用后台 第三方存储 短信 工程增强 Docker OpenAPI 测试":
    "milestones base service auth permission common admin third-party storage SMS engineering enhancement Docker OpenAPI test",
  "命名规范 安全要求 bcrypt argon2 token Redis 上传校验 导出白名单 Swagger 第三方密钥 短信限流":
    "naming rules security requirements bcrypt argon2 token Redis upload validation export whitelist Swagger third-party secrets SMS rate limit",
  "本地开发 运行 打包 Docker server admin h5 go run pnpm build docker compose":
    "local development run build Docker server admin h5 go run pnpm build docker compose",
  "MIT License 开源协议 免费商用 二次开发 私有部署 再分发":
    "MIT License open source license free commercial use secondary development private deployment redistribution",
  "后续文档 拆分 architecture api-contract rbac frontend backend database im third-party generator deployment":
    "documentation split architecture api-contract rbac frontend backend database im third-party generator deployment",
};

const exactChineseTerms = {
  中: "ZH",
  权: "P",
  配: "C",
  云: "S",
  导: "E",
  层: "Layer",
  和: "and",
  空: "Empty",
  管理员: "Admin",
};
const phraseEntries = Object.entries(chineseTerms)
  .filter(([source]) => source.length > 1)
  .sort((a, b) => b[0].length - a[0].length);
const originalTextNodes = [];
const originalAttributes = [];

let currentLang = localStorage.getItem(STORAGE_KEY) || "zh";
if (!translations[currentLang]) {
  currentLang = "zh";
}

function t(key) {
  return translations[currentLang][key];
}

function hasChinese(text) {
  return HAN_RE.test(text || "");
}

function translateChineseText(input) {
  if (!hasChinese(input)) {
    return input;
  }

  const trimmed = input.trim();
  if (Object.hasOwn(exactChineseTerms, trimmed)) {
    return input.replace(trimmed, exactChineseTerms[trimmed]);
  }

  let output = input;
  phraseEntries.forEach(([source, target]) => {
    output = output.split(source).join(target);
  });

  return output
    .replace(/、/g, ", ")
    .replace(/，/g, ", ")
    .replace(/。/g, ".")
    .replace(/；/g, "; ")
    .replace(/：/g, ": ")
    .replace(/（/g, " (")
    .replace(/）/g, ")")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/([([])\s+/g, "$1")
    .replace(/\s+([\])])/g, "$1");
}

function captureOriginalLanguageSource() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    originalTextNodes.push({ node, value: node.nodeValue });
    node = walker.nextNode();
  }

  document.querySelectorAll("*").forEach((element) => {
    const attrs = {};
    TRANSLATABLE_ATTRIBUTES.forEach((attr) => {
      if (element.hasAttribute(attr)) {
        attrs[attr] = element.getAttribute(attr);
      }
    });
    if (Object.keys(attrs).length > 0) {
      originalAttributes.push({ element, attrs });
    }
  });
}

function restoreOriginalLanguageSource() {
  originalTextNodes.forEach(({ node, value }) => {
    node.nodeValue = value;
  });

  originalAttributes.forEach(({ element, attrs }) => {
    Object.entries(attrs).forEach(([attr, value]) => {
      element.setAttribute(attr, value);
    });
  });
}

function translateDocumentToEnglish() {
  originalTextNodes.forEach(({ node }) => {
    if (hasChinese(node.nodeValue)) {
      node.nodeValue = translateChineseText(node.nodeValue);
    }
  });

  originalAttributes.forEach(({ element, attrs }) => {
    Object.keys(attrs).forEach((attr) => {
      const value = element.getAttribute(attr);
      if (hasChinese(value)) {
        element.setAttribute(attr, translateChineseText(value));
      }
    });
  });
}

function sectionTitle(section) {
  return translations[currentLang].sectionTitles[section.id] || section.querySelector("h2")?.textContent?.trim() || section.id;
}

function buildNav() {
  const items = sections
    .map((section) => `<a href="#${section.id}" data-nav-link="${section.id}">${sectionTitle(section)}</a>`)
    .join("");

  navContainers.forEach((container) => {
    container.innerHTML = items;
  });
}

function applyLanguage(lang) {
  if (!translations[lang]) {
    return;
  }

  currentLang = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  restoreOriginalLanguageSource();

  if (lang === "en") {
    translateDocumentToEnglish();
  }

  document.documentElement.lang = t("htmlLang");
  document.title = t("title");

  document.querySelectorAll("[data-lang-switch]").forEach((button) => {
    const isActive = button.dataset.langSwitch === lang;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
    button.textContent = button.dataset.langSwitch === "zh" ? t("zhSwitch") : t("enSwitch");
  });

  const langSwitch = document.querySelector(".lang-switch");
  if (langSwitch) {
    langSwitch.setAttribute("aria-label", t("languageSwitch"));
  }

  document.querySelectorAll("[data-search-open]").forEach((button) => {
    button.textContent = t("search");
  });

  const searchLabel = document.querySelector(".search-head label");
  if (searchLabel) {
    searchLabel.textContent = t("searchLabel");
  }

  const searchPanel = document.querySelector(".search-panel");
  if (searchPanel) {
    searchPanel.setAttribute("aria-label", t("searchLabel"));
  }

  const searchInput = document.querySelector("[data-search-input]");
  if (searchInput) {
    searchInput.placeholder = t("searchPlaceholder");
  }

  const searchClose = document.querySelector("[data-search-close]");
  if (searchClose) {
    searchClose.textContent = t("close");
  }

  const drawerTitle = document.querySelector(".drawer-head strong");
  if (drawerTitle) {
    drawerTitle.textContent = t("menuTitle");
  }

  const menuButton = document.querySelector("[data-menu-button]");
  if (menuButton) {
    menuButton.setAttribute("aria-label", t("menuOpen"));
  }

  const menuClose = document.querySelector("[data-menu-close]");
  if (menuClose) {
    menuClose.textContent = t("close");
    menuClose.setAttribute("aria-label", t("menuClose"));
  }

  const sidebarSubtitle = document.querySelector(".sidebar-brand span");
  if (sidebarSubtitle) {
    sidebarSubtitle.textContent = t("sidebarSubTitle");
  }

  const heroTitle = document.querySelector("#hero-title");
  const heroSlogan = document.querySelector(".hero-slogan");
  const heroDesc = document.querySelector(".hero-desc");
  const heroPrimary = document.querySelector(".hero-actions .primary-link");
  const heroSecondary = document.querySelector(".hero-actions .secondary-link");

  if (heroTitle) heroTitle.textContent = t("staticText").heroTitle;
  if (heroSlogan) heroSlogan.textContent = t("staticText").heroSlogan;
  if (heroDesc) heroDesc.textContent = t("staticText").heroDesc;
  if (heroPrimary) heroPrimary.textContent = t("staticText").heroPrimary;
  if (heroSecondary) heroSecondary.textContent = t("staticText").heroSecondary;

  sections.forEach((section) => {
    const heading = section.querySelector("h2");
    if (heading) {
      heading.textContent = sectionTitle(section);
    }
  });

  document.querySelectorAll(".copy-button").forEach((button) => {
    button.textContent = t("copy");
  });

  buildNav();
  renderSearch(document.querySelector("[data-search-input]")?.value || "");
}

function setupCopyButtons() {
  document.querySelectorAll("pre").forEach((pre) => {
    if (pre.querySelector(".copy-button")) {
      return;
    }

    const button = document.createElement("button");
    button.className = "copy-button";
    button.type = "button";
    button.textContent = t("copy");
    button.addEventListener("click", async () => {
      const text = pre.querySelector("code")?.innerText || "";
      try {
        await navigator.clipboard.writeText(text);
        button.textContent = t("copied");
      } catch {
        button.textContent = t("copyFailed");
      }
      window.setTimeout(() => {
        button.textContent = t("copy");
      }, 1200);
    });
    pre.appendChild(button);
  });
}

function setupActiveNav() {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      document.querySelectorAll("[data-nav-link]").forEach((link) => {
        link.classList.toggle("active", link.dataset.navLink === visible.target.id);
      });
    },
    {
      rootMargin: "-100px 0px -65% 0px",
      threshold: [0.1, 0.25, 0.5],
    },
  );

  sections.forEach((section) => observer.observe(section));
}

function setupMobileDrawer() {
  const drawer = document.querySelector("[data-mobile-drawer]");
  const openButton = document.querySelector("[data-menu-button]");
  const closeButton = document.querySelector("[data-menu-close]");

  if (!drawer || !openButton || !closeButton) {
    return;
  }

  const close = () => drawer.classList.remove("open");

  openButton.addEventListener("click", () => drawer.classList.add("open"));
  closeButton.addEventListener("click", close);
  drawer.addEventListener("click", (event) => {
    if (event.target === drawer || event.target instanceof HTMLAnchorElement) {
      close();
    }
  });
}

function searchItems() {
  return sections.map((section) => ({
    id: section.id,
    title: sectionTitle(section),
    text: `${sectionTitle(section)} ${section.dataset.search || ""} ${section.textContent || ""}`.toLowerCase(),
  }));
}

function renderSearch(keyword = "") {
  const results = document.querySelector("[data-search-results]");
  if (!results) {
    return;
  }

  const term = keyword.trim().toLowerCase();
  const matches = term ? searchItems().filter((item) => item.text.includes(term)).slice(0, 8) : searchItems().slice(0, 6);

  if (matches.length === 0) {
    results.innerHTML = `<div class="search-empty">${t("noResults")}</div>`;
    return;
  }

  results.innerHTML = matches
    .map((item) => `<a href="#${item.id}" data-search-hit><strong>${item.title}</strong><span>${item.id}</span></a>`)
    .join("");
}

function setupSearch() {
  const modal = document.querySelector("[data-search-modal]");
  const input = document.querySelector("[data-search-input]");
  const openButtons = document.querySelectorAll("[data-search-open]");
  const closeButton = document.querySelector("[data-search-close]");

  if (!modal || !input || !closeButton) {
    return;
  }

  const open = () => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    renderSearch(input.value);
    window.setTimeout(() => input.focus(), 0);
  };

  const close = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };

  openButtons.forEach((button) => button.addEventListener("click", open));
  closeButton.addEventListener("click", close);
  input.addEventListener("input", () => renderSearch(input.value));
  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target instanceof HTMLAnchorElement) {
      close();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      close();
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      open();
    }
  });
}

function setupLanguageSwitch() {
  document.querySelectorAll("[data-lang-switch]").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.langSwitch));
  });
}

captureOriginalLanguageSource();
setupCopyButtons();
setupActiveNav();
setupMobileDrawer();
setupSearch();
setupLanguageSwitch();
applyLanguage(currentLang);
