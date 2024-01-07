export type Direction = "START" | "END";
export type onHorizontalOOB = (direction: Direction) => void;
export type onVerticalOOB = (direction: Direction) => void;

export type NavigationProps = OOB_Event;
export type onOOBNavigation = (props: NavigationProps) => void;
