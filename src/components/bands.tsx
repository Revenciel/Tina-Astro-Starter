import React from 'react';
import type { Page } from '../../tina/__generated__/types'

// Import all bands:
import Text from './bands/text';
import Photo from './bands/photo';
import FlexContent from './bands/flexContent';

export const Bands = (props: Page) => {
    return(
        <>
        {props.bands
        ? props.bands.map(function (band, i) {
            switch (band!.__typename) {

              // Add a case for each band:
              case 'PageBandsTextBand':
                return (
                  <React.Fragment key={i + band!.__typename}>
                    <Text data={band} />
                  </React.Fragment>
                )

              case 'PageBandsPhotoBand':
                return (
                  <React.Fragment key={i + band!.__typename}>
                    <Photo data={band} />
                  </React.Fragment>
                )

              case 'PageBandsFlexContent':
                return (
                  <React.Fragment key={i + band!.__typename}>
                    <FlexContent data={band} />
                  </React.Fragment>
                )

              default:
                return null
            }
          })
        : null}
        </>
    )
}