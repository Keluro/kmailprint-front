import React from 'react';
import { LocaleContext } from '../locales/LocaleContext';

const DonationSection: React.FC = () => {
  const { t } = React.useContext(LocaleContext);

  return (
    <>
      <p>
        <span>{t('EntireEmailStr')} &nbsp;</span>
        <a href="mailto:benoit.patra@gmail.com" target="_blank">
          benoit.patra@gmail.com
        </a>
      </p>
      <p>
        <span>{t('SupportKMailPrintHosting')}</span>
        <span>
          <a href="https://benoitpatra.com/about" target="_blank">
            Benoit Patra.
          </a>
        </span>
      </p>
      <p>
        <span>{t('SupportKMailPrintHosting2')}</span>
      </p>
      <form
        action="https://www.paypal.com/cgi-bin/webscr"
        method="post"
        target="_blank"
      >
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value="3C8ENK8N6WZW2" />
        <input
          type="image"
          src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
          name="submit"
          alt="PayPal - The safer, easier way to pay online!"
        />
        <img
          alt=""
          src="https://www.paypalobjects.com/fr_FR/i/scr/pixel.gif"
          width="1"
          height="1"
        ></img>
      </form>
    </>
  );
};

export default DonationSection;
