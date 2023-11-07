import * as Tabs from "@radix-ui/react-tabs";
import { ReactNode } from "react";

type TabsScaffoldProps<TabValue extends string> = {
  tabData: {
    tabValue: TabValue;
    displayValue: string;
    content: ReactNode;
  }[];
  defaultTabValue: TabValue;
}

export default function TabsScaffold<T extends string>({ defaultTabValue, tabData, ...restProps }: TabsScaffoldProps<T>) {
  return <Tabs.Root className="" defaultValue={defaultTabValue} {...restProps}>
    <Tabs.List className="flex flex-row px-2 justify-center">
      {
        tabData.map(({ displayValue, tabValue }) => (
          <Tabs.Trigger className="rounded-lg flex-0 px-4 py-2 transition data-[state=active]:bg-slate-200 data-[state=active]:text-slate-900 data-[state=active]:font-bold" key={tabValue} value={tabValue}>
            {displayValue}
          </Tabs.Trigger>
        ))
      }
    </Tabs.List>
    {
      tabData.map(({ content, tabValue }) => (
        <Tabs.Content key={tabValue} value={tabValue} asChild>
          {content}
        </Tabs.Content>
      ))
    }
  </Tabs.Root>
}