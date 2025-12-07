import {
  IconCheckbox,
  IconHome,
  IconMoodSadSquint,
  IconPencil,
  IconSettings,
} from "@tabler/icons-react";
import { getDateStr } from "@/lib/date/date";

// Menu items.
export const items = {
  navMain: [
    {
      title: "ホーム",
      url: "/dashboard",
      icon: IconHome,
    },
    {
      title: "日記",
      url: `/dashboard/diary/${getDateStr()}`,
      icon: IconPencil,
    },
    {
      title: "習慣",
      url: `/dashboard/habits`,
      icon: IconCheckbox,
    },
    {
      title: "ネガティブノート",
      url: `/dashboard/negative-notes`,
      icon: IconMoodSadSquint,
    },
    {
      title: "設定",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
  ],
  navSecondary: [],
};
