import React, { useContext } from "react";
import { Grid, Paper, Button, Typography, Box } from "@mui/material";
import styled from "@emotion/styled";

import { TradePlanProvider, TradePlanContext } from "./context";

import GeneralInfo from "./GeneralInfo";
import Thesis from "./Thesis";
import Zones from "./Zones";
import SubmitButton from "./SubmitButton";

const Section = styled(Paper, (props) => ({ ...props }))`
  padding: 1rem;
  margin: 1rem 0;
`;

export default function TradePlanForm({ onSubmit = (formData) => ({ ...formData }) }) {
  const { state } = useContext(TradePlanContext);
  return (
    <TradePlanProvider>
      <Box sx={{ maxHeight: "75vh", overflow: "scroll" }}>
        <Section>
          <GeneralInfo />
        </Section>
        <Section>
          <Thesis />
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
