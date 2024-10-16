import type { CSSProperties, SVGProps } from "react";
import { Flex, Typography } from "antd";
import type { TitleProps } from "antd/lib/typography/Title";
import { IconInvoicerLogo } from "@/components/icons";
import { useStyles } from "./styled";

type Props = {
  className?: string;
  style?: CSSProperties;
  svgProps?: SVGProps<SVGSVGElement>;
  titleProps?: TitleProps;
};

export const Logo = (props: Props) => {
  const { styles } = useStyles();

  return (
    <Flex
      align="center"
      gap={12}
      className={props.className}
      style={{
        height: "48px",
        ...props.style,
      }}
    >
      <IconInvoicerLogo {...props.svgProps} />
      <Flex gap={4}>
        <Typography.Title
          className={styles.headerTitleRefine}
          level={5}
          {...props.titleProps}
        >
          Deca{" "}
        </Typography.Title>
        <Typography.Title
          className={styles.headerTitleInvoicer}
          level={5}
          {...props.titleProps}
        >
          Sync
        </Typography.Title>
      </Flex>
    </Flex>
  );
};
