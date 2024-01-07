export type Direction = "START" | "END";
export type onHorizontalOOB = (direction: Direction) => void;
export type onVerticalOOB = (direction: Direction) => void;

export type NavigationProps = OOB_Event;
export type onHorizontalOOB2 = (props: NavigationProps) => void;
