import "./footer.css"
import { useTranslation } from "react-i18next"

const Footer = () => {
  const { t } = useTranslation()

    return (
        <div className="footer">
          <h1 className="fTitle">{t("footer.enjoy")}</h1>
          <div className="fText">Copyright © 2023 Stardust Lodge.</div>
        </div>
      )
}

export default Footer