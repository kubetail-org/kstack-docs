// @ts-check
import cloudflare from "@astrojs/cloudflare";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightContextualMenu from "starlight-contextual-menu";
import starlightLlmsTxt from "starlight-llms-txt";

const isDev = process.argv.includes("dev");

// https://astro.build/config
export default defineConfig({
  adapter: isDev
    ? node({ mode: "standalone" })
    : cloudflare({
        prerenderEnvironment: "node",
        imageService: "passthrough",
      }),

  site: "https://kstack.sh",
  trailingSlash: "never",
  devToolbar: { enabled: false },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          "zh-cn": "zh-CN",
          ja: "ja",
          ko: "ko",
          de: "de",
          es: "es",
          pt: "pt",
          fr: "fr",
        },
      },
    }),
    starlight({
      plugins: [
        starlightContextualMenu({
          actions: ["copy", "view", "chatgpt", "claude", "lechat"],
        }),
        starlightLlmsTxt({
          projectName: "kstack",
          description: `Kstack is a skill pack for Claude Code that helps you perform monitoring, troubleshooting and auditing tasks on your K8s clusters in a smart and efficient way.`,
        }),
      ],
      defaultLocale: "root",
      locales: {
        root: { label: "English", lang: "en" },
        "zh-cn": { label: "简体中文", lang: "zh-CN" },
        ja: { label: "日本語", lang: "ja" },
        ko: { label: "한국어", lang: "ko" },
        de: { label: "Deutsch", lang: "de" },
        es: { label: "Español", lang: "es" },
        pt: { label: "Português", lang: "pt" },
        fr: { label: "Français", lang: "fr" },
      },
      title: "kstack",
      customCss: ["./src/styles/custom.css"],
      logo: {
        src: "./src/assets/logo.svg",
        replacesTitle: true,
      },
      components: {
        SiteTitle: "./src/components/SiteTitle.astro",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/kubetail-org/kstack",
        },
        {
          icon: "discord",
          label: "Discord",
          href: "https://discord.gg/CmsmWAVkvX",
        },
      ],
      head: [
        {
          tag: "link",
          attrs: { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        },
        { tag: "link", attrs: { rel: "manifest", href: "/site.webmanifest" } },
      ],
      editLink: {
        baseUrl: "https://github.com/kubetail-org/kstack-docs/edit/main/",
      },
      sidebar: [
        {
          label: "Welcome",
          translations: {
            "zh-CN": "欢迎",
            ja: "ようこそ",
            ko: "환영합니다",
            de: "Willkommen",
            es: "Bienvenido",
            pt: "Bem-vindo",
            fr: "Bienvenue",
          },
          slug: "",
        },
        {
          label: "Getting Started",
          translations: {
            "zh-CN": "入门指南",
            ja: "はじめに",
            ko: "시작하기",
            de: "Erste Schritte",
            es: "Primeros pasos",
            pt: "Primeiros passos",
            fr: "Premiers pas",
          },
          items: [
            {
              label: "Introduction",
              translations: {
                "zh-CN": "简介",
                ja: "概要",
                ko: "소개",
                de: "Einführung",
                es: "Introducción",
                pt: "Introdução",
                fr: "Introduction",
              },
              slug: "concepts/introduction",
            },
            {
              label: "Installation",
              translations: {
                "zh-CN": "安装",
                ja: "インストール",
                ko: "설치",
                de: "Installation",
                es: "Instalación",
                pt: "Instalação",
                fr: "Installation",
              },
              slug: "tutorials/installation",
            },
            {
              label: "Security",
              translations: {
                "zh-CN": "安全",
                ja: "セキュリティ",
                ko: "보안",
                de: "Sicherheit",
                es: "Seguridad",
                pt: "Segurança",
                fr: "Sécurité",
              },
              slug: "concepts/security",
            },
          ],
        },
        {
          label: "Skills",
          translations: {
            "zh-CN": "技能",
            ja: "スキル",
            ko: "스킬",
            de: "Skills",
            es: "Habilidades",
            pt: "Habilidades",
            fr: "Compétences",
          },
          items: [
            {
              label: "Overview",
              translations: {
                "zh-CN": "概述",
                ja: "概要",
                ko: "개요",
                de: "Überblick",
                es: "Descripción general",
                pt: "Visão geral",
                fr: "Vue d'ensemble",
              },
              slug: "reference/skills/overview",
            },
            {
              label: "Monitoring",
              translations: {
                "zh-CN": "监控",
                ja: "監視",
                ko: "모니터링",
                de: "Überwachung",
                es: "Monitoreo",
                pt: "Monitoramento",
                fr: "Surveillance",
              },
              items: [
                {
                  label: "/cluster-status",
                  slug: "reference/skills/cluster-status",
                },
                { label: "/events", slug: "reference/skills/events" },
              ],
            },
            {
              label: "Troubleshooting",
              translations: {
                "zh-CN": "故障排除",
                ja: "トラブルシューティング",
                ko: "문제 해결",
                de: "Fehlerbehebung",
                es: "Solución de problemas",
                pt: "Solução de problemas",
                fr: "Dépannage",
              },
              items: [
                {
                  label: "/investigate",
                  slug: "reference/skills/investigate",
                },
                { label: "/logs", slug: "reference/skills/logs" },
                { label: "/metrics", slug: "reference/skills/metrics" },
                { label: "/exec", slug: "reference/skills/exec" },
              ],
            },
            {
              label: "Audits",
              translations: {
                "zh-CN": "审计",
                ja: "監査",
                ko: "감사",
                de: "Audits",
                es: "Auditorías",
                pt: "Auditorias",
                fr: "Audits",
              },
              items: [
                {
                  label: "/audit-security",
                  slug: "reference/skills/audit-security",
                },
                {
                  label: "/audit-network",
                  slug: "reference/skills/audit-network",
                },
                {
                  label: "/audit-cost",
                  slug: "reference/skills/audit-cost",
                },
                {
                  label: "/audit-outdated",
                  slug: "reference/skills/audit-outdated",
                },
              ],
            },
            {
              label: "Miscellaneous",
              translations: {
                "zh-CN": "其他",
                ja: "その他",
                ko: "기타",
                de: "Verschiedenes",
                es: "Misceláneas",
                pt: "Diversos",
                fr: "Divers",
              },
              items: [
                {
                  label: "/cleanup",
                  slug: "reference/skills/cleanup",
                },
                {
                  label: "/forget",
                  slug: "reference/skills/forget",
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
