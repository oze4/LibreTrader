import React from "react";
import { Grid, Paper, Box } from "@mui/material";
import styled from "@emotion/styled";

import { TradePlanProvider } from "./context";

import GeneralInfo from "./GeneralInfo";
import NewsAndCatalysts from "./NewsAndCatalysts";
import Zones from "./Zones";
import SubmitButton from "./SubmitButton";

const Section = styled(Paper, (props) => ({ ...props }))`
  padding: 1rem;
  margin: 1rem 0;
`;

export default function TradePlanForm({
  onSubmit = (formData) => ({ ...formData }),
  BoxContainerProps = {},
}) {
  return (
    <TradePlanProvider>
      <Box {...BoxContainerProps}>
        <Section>
          <GeneralInfo />
        </Section>
        <Section>
          <NewsAndCatalysts />
        </Section>
        <Section>
          <Zones />
        </Section>
      </Box>
      <Grid item xs={12} container justifyContent="center" margin="0.5rem">
        <SubmitButton
          title="ADD TO TRADE PLAN"
          onSubmit={(formDataState) => onSubmit(formDataState)}
        />
      </Grid>
    </TradePlanProvider>
  );
}
