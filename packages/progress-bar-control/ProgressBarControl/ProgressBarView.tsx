import * as React from "react";
import {
  Badge,
  Body1,
  Body1Strong,
  Caption1,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  ProgressBar,
  Text,
  makeStyles,
  tokens
} from "@fluentui/react-components";
import { CheckmarkCircleRegular } from "@fluentui/react-icons/svg/checkmark-circle";
import { ClockRegular } from "@fluentui/react-icons/svg/clock";
import { WarningRegular } from "@fluentui/react-icons/svg/warning";

export interface ProgressBarViewProps {
  title: string;
  subTitle: string;
  statusMessage: string;
  value: number;
}

const useStyles = makeStyles({
  card: {
    maxWidth: "360px",
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow64,
    background: tokens.colorNeutralBackground1,
  },
  preview: {
    paddingBlock: tokens.spacingVerticalL,
    paddingInline: tokens.spacingHorizontalXXXL,
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalM,
  },
  progressContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalS,
  },
  percent: {
    fontSize: "3rem",
    fontWeight: 700,
    lineHeight: 1,
    color: tokens.colorBrandForeground1,
  },
  footer: {
    paddingBlock: tokens.spacingVerticalS,
    paddingInline: tokens.spacingHorizontalL,
    borderTop: `1px solid ${tokens.colorNeutralStrokeAlpha2}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const iconByStatus = (percent: number) => {
  if (percent >= 85) {
    return <CheckmarkCircleRegular />;
  }

  if (percent >= 50) {
    return <ClockRegular />;
  }

  return <WarningRegular />;
};

const badgeAppearanceByStatus = (percent: number): "success" | "warning" | "danger" => {
  if (percent >= 85) {
    return "success";
  }

  if (percent >= 50) {
    return "warning";
  }

  return "danger";
};

export const ProgressBarView: React.FC<ProgressBarViewProps> = ({
  title,
  subTitle,
  statusMessage,
  value,
}) => {
  const styles = useStyles();
  const clampedValue = Math.min(Math.max(Math.round(value), 0), 100);
  const badgeAppearance = badgeAppearanceByStatus(clampedValue);

  return (
    <Card className={styles.card} orientation="vertical">
      <CardHeader
        header={<Text size={600} weight="semibold">{title}</Text>}
        description={<Caption1>{subTitle}</Caption1>}
        action={<Badge appearance="outline" color="brand">Milestone</Badge>}
      />
      <CardPreview className={styles.preview}>
        <Body1Strong>Overall completion</Body1Strong>
        <div className={styles.progressContainer}>
          <span className={styles.percent}>{clampedValue}%</span>
          <ProgressBar value={clampedValue} max={100} shape="rounded" thickness="large" />
          <Body1>{statusMessage}</Body1>
        </div>
      </CardPreview>
      <CardFooter className={styles.footer}>
        <Badge appearance="filled" color={badgeAppearance} icon={iconByStatus(clampedValue)}>
          {badgeAppearance === "success" && "On track"}
          {badgeAppearance === "warning" && "At risk"}
          {badgeAppearance === "danger" && "Off track"}
        </Badge>
        <Text size={200} weight="semibold">Review forecast ➜</Text>
      </CardFooter>
    </Card>
  );
};
