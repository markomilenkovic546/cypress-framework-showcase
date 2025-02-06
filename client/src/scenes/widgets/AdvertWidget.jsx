import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper data-cy="advert-widget">
      <FlexBetween data-cy="advert-header">
        <Typography color={dark} variant="h5" fontWeight="500" data-cy="advert-title">
          Sponsored
        </Typography>
        <Typography color={medium} data-cy="advert-create-ad">
          Create Ad
        </Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        data-cy="advert-image"
      />
      <FlexBetween data-cy="advert-details">
        <Typography color={main} data-cy="advert-brand">
          MikaCosmetics
        </Typography>
        <Typography color={medium} data-cy="advert-website">
          mikacosmetics.com
        </Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0" data-cy="advert-description">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
