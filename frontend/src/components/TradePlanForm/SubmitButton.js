import React from "react";
import { Fab, useMediaQuery, Tooltip } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import styled from "@emotion/styled";

import { useTradePlanContext } from "./context";

const StyledFab = styled(Fab, (props) => ({ ...props }))`
  position: fixed;
  z-index: 9000;
  /*
  bottom: 3em;
  right: 6em;
  */
`;

export default function SubmitButton({ onSubmit, title, ButtonProps = {} }) {
  const isMediumSmallScreen = useMediaQuery((theme) => theme.breakpoints.between("0", "1840"));
  const { state, clearForm, setState } = useTradePlanContext();

  const handleSubmit = () => {
    // remove props "zone" and "newsCatalyst" from the object we emit in the "onSubmit" event.
    const { zone, newsCatalyst, ...data } = state;
    // If required field is empty add an error to error object for it
    const requiredFields = ["symbol", "summary", "date"];
    const errObj = {
      errors: requiredFields.reduce(
        (errs, field) => {
          if (!data[field] || data[field] === "") errs[field] = `REQUIRED FIELD`;
          return errs;
        },
        { ...state.errors },
      ),
    };
    setState(errObj);
    if (Object.keys(errObj.errors).length > 0) {
      return;
    }
    // If required fields are ok we trigger onSubmit event
    onSubmit(data);
    clearForm();
  };

  const sx = isMediumSmallScreen
    ? { bottom: "16px", right: "16px" }
    : { bottom: "4em", right: "20em" };

  return (
    <Tooltip title="add to trade plan">
      <StyledFab size="large" onClick={handleSubmit} sx={sx} color="primary">
        <AddIcon />
      </StyledFab>
    </Tooltip>
  );
}
