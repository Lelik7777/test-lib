import { resolve } from 'path'

import { defineConfig } from 'vite'

import { dependencies, devDependencies } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      // the proper extensions will be added
      fileName: 'index',
      //это мы указываем,какой вид модуля нам нужен на выходе
      formats: ['es'],
      //name any what you want, usually use name of project(library), for example ui-kit
      name: 'ui-kit',
    },
    //rollu - это сборщик, который работает под капотом vite
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      //здесь мы указываем все импортированные из package.json зависимости и дев зависимости,чтобы они не попадали в бандл
      //'react/jsx-runtime' - это мы указываем, поскольку,как библиотека, нам не нужен реакт, поскольку он будет на проекте,где эта библиотека будет юзаться
      external: [
        ...Object.keys(dependencies),
        ...Object.keys(devDependencies),
        'react/jsx-runtime',
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
      },
    },
    //sourcemap помогает отлаживать код после сборки(можем видеть оригинальные имена переменных),но это может жрать память, тогда нужно удалить это из конфига
    sourcemap: true,
    //чтобы использовать последние фичи
    target: 'esnext',
  },
})
