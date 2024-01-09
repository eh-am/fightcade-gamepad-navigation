import {
  onHorizontalOOB,
  onOOBNavigation,
  onVerticalOOB,
} from "@app/types/navigation";

export type SectionProps = {
  root: HTMLElement;
  onVerticalOOB: onVerticalOOB;
  onHorizontalOOB: onHorizontalOOB;
  onOOBNavigation: onOOBNavigation;
};
