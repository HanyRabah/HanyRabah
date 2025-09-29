'use client'

import React from 'react'
import { ConfigProvider, theme } from 'antd'

interface AntdProviderProps {
  children: React.ReactNode
}

export default function AntdProvider({ children }: AntdProviderProps) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          colorSuccess: '#52c41a',
          colorWarning: '#faad14',
          colorError: '#ff4d4f',
          borderRadius: 8,
          fontSize: 14,
        },
        components: {
          Layout: {
            bodyBg: '#f5f5f5',
            headerBg: '#ffffff',
            siderBg: '#ffffff',
          },
          Menu: {
            itemBg: 'transparent',
            itemSelectedBg: '#e6f7ff',
            itemSelectedColor: '#1890ff',
            itemHoverBg: '#f5f5f5',
          },
          Button: {
            borderRadius: 6,
          },
          Card: {
            borderRadius: 8,
          },
          Table: {
            borderRadius: 8,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}
