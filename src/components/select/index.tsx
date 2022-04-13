import { FC } from "react";
import { default as SelectRC, Props as SelectRCProps } from "react-select";

type Props = {
  fullWidth?: boolean;
  fullHeight?: boolean;
} & SelectRCProps;

export const Select: FC<Props> = ({
  fullWidth = true,
  fullHeight = false,
  ...props
}) => {
  return (
    <SelectRC
      {...props}
      styles={{
        container: (provided, state) => ({
          ...provided,
          minWidth: fullWidth ? "100%" : undefined,
          minHeight: fullHeight ? "100%" : undefined,
          ...(props.styles?.container
            ? props.styles?.container(provided, state)
            : {}),
        }),
        control: (provided, state) => ({
          ...provided,
          transition: "all 0.3s ease",
          border: "none",
          backgroundColor: "var(--color-dark-10)",
          borderRadius: "0.8rem",
          cursor: "pointer",
          boxShadow: "none",
          minHeight: fullHeight ? "100%" : undefined,
          ...(props.styles?.control
            ? props.styles?.control(provided, state)
            : {}),

          "&:hover": {
            backgroundColor: "var(--color-dark-25)",
          },
        }),
        indicatorSeparator: () => ({ display: "none" }),
        singleValue: (provided, state) => ({
          ...provided,
          fontFamily: "Roboto",
          fontWeight: 400,
          fontSize: "16px",
          ...(props.styles?.singleValue
            ? props.styles?.singleValue(provided, state)
            : {}),
        }),
        option: (provided, state) => ({
          ...provided,
          transition: "all 0.3s ease",
          backgroundColor: state.isSelected
            ? "var(--color-blue) !important"
            : state.isFocused
            ? "var(--color-dark-10)"
            : "white",
          fontFamily: "Roboto",
          fontWeight: 400,
          fontSize: "16px",
          ...(props.styles?.option
            ? props.styles?.option(provided, state)
            : {}),

          "&:hover": {
            backgroundColor: "var(--color-dark-10)",
          },
        }),
      }}
    />
  );
};
