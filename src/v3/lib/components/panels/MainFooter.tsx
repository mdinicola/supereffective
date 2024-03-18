import config from '@/v3/config'

import { ExternLink, SiteLink } from '../Links'
import { DiscordLinkIcon, GithubLinkIcon, TwitterLinkIcon } from '../icons/brand-icons'
import { LogoWhite } from '../layout/LogoWhite'
import styles from './MainFooter.module.css'

export default function MainFooter() {
  const currentYear = new Date().getFullYear()
  const titleClass = [styles.title, 'typo-compact'].join(' ')
  return (
    <footer className={styles.footer}>
      <section className={styles.main}>
        <div className={[styles.mainItem, styles.logoContainer].join(' ')}>
          <LogoWhite opacity={0.5} />
          <div className={styles.siteVersion}>v{config.version.num}</div>
        </div>
        <nav className={styles.mainItem}>
          <p className={titleClass}>Sections</p>
          <ul>
            <li>
              <SiteLink href="/apps/livingdex">Living Dex</SiteLink>
            </li>
            <li>
              <SiteLink href="/apps/pokedex">PokéDex</SiteLink>
            </li>
            <li>
              <SiteLink href="/about">About This Site</SiteLink>
            </li>
            <li>
              <ExternLink href={config.links.roadmap}>Roadmap</ExternLink>
            </li>
          </ul>
        </nav>

        <div className={styles.mainItem}>
          <p className={titleClass}>Contributing</p>
          <ul>
            <li>
              <SiteLink href="/donate" title={'Donate to the developer to help keep this site running'}>
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
              <TwitterLinkIcon className={styles.brandLink} />
              <DiscordLinkIcon className={styles.brandLink} />
              <GithubLinkIcon className={styles.brandLink} />
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.legalBanner}>
        <i>
          &copy; {currentYear} SuperEffective.GG . This is a fan site and is not affiliated with The Pokémon Company
          International, Game Freak or &copy; Nintendo.
        </i>
      </section>
    </footer>
  )
}
