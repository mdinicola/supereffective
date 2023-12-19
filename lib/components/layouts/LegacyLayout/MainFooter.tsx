import config from '@/config'

import { ExternLink, links_to_li, SiteLink, siteLinks } from '../../legacy/Link/Links'
import { LogoWhite } from './LogoWhite'
import styles from './MainFooter.module.css'

export default function MainFooter() {
  const titleClass = [styles.title, 'typo-compact'].join(' ')
  return (
    <footer className={styles.footer}>
      <section className={styles.main}>
        <div className={[styles.mainItem, styles.logoContainer].join(' ')}>
          <LogoWhite opacity={0.5} />
          <div className={styles.siteVersion}>v{config.version.num}</div>
        </div>
        <nav className={styles.mainItem}>
          <p className={titleClass}>Articles</p>
          <ul>
            <li>
              <SiteLink href="/news">News</SiteLink>
            </li>
            <li>
              <SiteLink href="/about">About This Site</SiteLink>
            </li>
            <li>
              <ExternLink href={config.links.roadmap}>Roadmap</ExternLink>
            </li>
          </ul>
        </nav>
        <nav className={styles.mainItem}>
          <p className={titleClass}>Applications</p>
          <ul>{links_to_li(siteLinks.pokegear, '')}</ul>
        </nav>

        <div className={styles.mainItem}>
          <p className={titleClass}>Contributing</p>
          <ul>
            <li>
              <SiteLink
                href="/donate"
                title={'Donate to the developer to help keep this site running'}
              >
                <i className="icon-pkg-mark-heart" title="Donate" />
                <span>Donations</span>
              </SiteLink>
            </li>
            <li>
              <ExternLink href={config.links.github_org} title={''}>
                <i className="icon-embed2" title="Source Code" />
                <span>Source Code</span>
              </ExternLink>
            </li>
            <li>
              <ExternLink href={config.links.issue_report} title={''}>
                <i className="icon-bug" title="Issue Report" />
                <span>Report an issue</span>
              </ExternLink>
            </li>
          </ul>
        </div>

        <nav className={styles.mainItem}>
          <p className={titleClass}>Legal</p>
          <ul>
            <li>
              <SiteLink href="/terms-and-conditions">Terms &amp; Conditions</SiteLink>
            </li>
            <li>
              <SiteLink href="/legal#privacy">Privacy Policy</SiteLink>
            </li>
            <li>
              <SiteLink href="/legal">Legal Disclaimer</SiteLink>
            </li>
          </ul>
        </nav>
        <div className={styles.mainItem}>
          <p className={titleClass}>Follow Us</p>
          <ul>
            <li className={styles.socialList}>
              <ExternLink href={config.links.twitter}>
                <i className="icon-brand-twitter" title="Twitter" />
              </ExternLink>
              <ExternLink href={config.links.github}>
                <i className="icon-brand-github" title="Github" />
              </ExternLink>
              <ExternLink href={config.links.discord}>
                <i className="icon-brand-discord" title="Discord" />
              </ExternLink>
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.legalBanner}>
        <i>
          &copy; 2022 SuperEffective.GG . This is a fan site and is not affiliated with The Pokémon
          Company International, Game Freak or &copy;Nintendo.
        </i>
      </section>
    </footer>
  )
}
