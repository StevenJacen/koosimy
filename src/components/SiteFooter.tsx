export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer__grid">
        <div className="site-footer__brand">
          <p><strong>酷施美</strong> DESIGN</p>
          <h2>一站式产品设计研发服务</h2>
        </div>
        <div className="site-footer__meta">
          <div>
            <span>公司地址</span>
            <p>上海市闵行区光中路255号 2栋508</p>
          </div>
          <div>
            <span>商务合作</span>
            <a href="tel:19301490913">谭先生 19301490913</a>
          </div>
          <div>
            <span>商务邮箱</span>
            <a href="mailto:tanqicai@koosimy.com">tanqicai@koosimy.com</a>
          </div>
        </div>
        <div className="site-footer__qr">
          <img src="/assets/contact/wechat-qr.jpg" alt="KOOSIMY 微信咨询二维码" loading="lazy" />
          <div className="site-footer__douyin" aria-label="抖音搜索酷施美">
            <span>抖音</span>
            <small>搜索酷施美</small>
          </div>
        </div>
      </div>
      <div className="site-container site-footer__copyright">
        © {new Date().getFullYear()} KOOSIMY. All rights reserved.
      </div>
    </footer>
  )
}
