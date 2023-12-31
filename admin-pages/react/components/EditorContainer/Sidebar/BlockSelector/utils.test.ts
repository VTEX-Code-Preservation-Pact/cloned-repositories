import EXTENSIONS from '../__fixtures__/extensions'
import { SidebarComponent } from '../typings'
import COMPONENTS from './__fixtures__/components'
import { NormalizedBlock } from './typings'
import {
  generateWarningMessage,
  getComponents,
  getParentTreePath,
  hasContentPropsInSchema,
  isRootComponent,
  normalize,
} from './utils'

const DEFAULT_EXTENSIONS_COMPONENTS = [
  {
    isEditable: true,
    name: 'admin/editor.carousel.title',
    treePath: 'store.home/carousel#home',
  },
  {
    isEditable: true,
    name: 'admin/editor.shelf.title',
    treePath: 'store.home/shelf#home',
  },
  {
    isEditable: true,
    name: 'admin/editor.productSummary.title',
    treePath: 'store.home/shelf#home/product-summary',
  },
]

describe('getComponents', () => {
  let spiedConsoleWarn: jest.MockInstance<
    ReturnType<Console['warn']>,
    Parameters<Console['warn']>
  >

  beforeEach(() => {
    spiedConsoleWarn = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => undefined)
  })

  afterEach(() => {
    spiedConsoleWarn.mockRestore()
  })

  it('should filter out components without either a schema or a title', () => {
    expect(getComponents(EXTENSIONS, COMPONENTS, 'store.home')).toEqual(
      DEFAULT_EXTENSIONS_COMPONENTS
    )
  })

  it('should use blocks from extension to determine order', () => {
    const swap = <T>(indexA: number, indexB: number, arr: T[]) => {
      const clonedArr = Array.from(arr)

      const temp = clonedArr[indexA]

      clonedArr[indexA] = clonedArr[indexB]

      clonedArr[indexB] = temp

      return clonedArr
    }

    const homeBlocks = EXTENSIONS['store.home'].blocks || []

    const shelfExtensionsIndex = homeBlocks.findIndex(item =>
      item.blockId.endsWith('shelf#home')
    )

    const carouselExtensionsIndex = homeBlocks.findIndex(item =>
      item.blockId.endsWith('carousel#home')
    )

    const reorderedHomeBlocks = swap(
      shelfExtensionsIndex,
      carouselExtensionsIndex,
      homeBlocks
    )

    const shelfComponentsIndex = DEFAULT_EXTENSIONS_COMPONENTS.findIndex(item =>
      item.treePath.endsWith('shelf#home')
    )

    const carouselComponentsIndex = DEFAULT_EXTENSIONS_COMPONENTS.findIndex(
      item => item.treePath.endsWith('carousel#home')
    )

    const reorderedDefaultComponentBlocks = swap(
      shelfComponentsIndex,
      carouselComponentsIndex,
      DEFAULT_EXTENSIONS_COMPONENTS
    )

    const extensions = {
      ...EXTENSIONS,
      'store.home': {
        ...EXTENSIONS['store.home'],
        blocks: reorderedHomeBlocks,
      },
    }

    expect(getComponents(extensions, COMPONENTS, 'store.home')).toEqual(
      reorderedDefaultComponentBlocks
    )
  })

  describe('schema with no titles', () => {
    it('should show extension that have only title in the blocks (extensions) and no schema', () => {
      const extensions: RenderRuntime['extensions'] = {
        ...EXTENSIONS,
        'store.home/title-in-blocks': {
          after: [],
          around: [],
          before: [],
          blockId: 'vtex.title-in-blocks@0.x:title-in-blocks',
          blocks: [],
          component: 'vtex.title-in-blocks@0.0.1/TitleInBlocks',
          composition: 'blocks',
          content: {},
          hasContentSchema: false,
          preview: null,
          props: {},
          render: 'server',
          title: 'admin/title-in-blocks.title',
          track: [],
        },
      }

      expect(getComponents(extensions, {}, 'store.home')).toEqual([
        {
          isEditable: false,
          name: 'admin/title-in-blocks.title',
          treePath: 'store.home/title-in-blocks',
        },
      ])
    })

    it('should filter out components whose extensions have falsy titles', () => {
      const extensions: RenderRuntime['extensions'] = {
        ...EXTENSIONS,
        'store.home/empty-string-title': {
          after: [],
          around: [],
          before: [],
          blockId: 'vtex.empty-string-title@0.x:empty-string-title',
          blocks: [],
          component: 'vtex.empty-string-title@0.0.1/EmptyStringTitle',
          composition: 'blocks',
          content: {},
          hasContentSchema: false,
          preview: null,
          props: {},
          render: 'server',
          track: [],
        },
        'store.home/null-title': {
          after: [],
          around: [],
          before: [],
          blockId: 'vtex.null-title@0.x:null-title',
          blocks: [],
          component: 'vtex.null-title@0.0.1/NullTitle',
          composition: 'blocks',
          content: {},
          hasContentSchema: false,
          preview: null,
          props: {},
          render: 'server',
          track: [],
        },
        'store.home/undefined-title': {
          after: [],
          around: [],
          before: [],
          blockId: 'vtex.undefined-title@0.x:undefined-title',
          blocks: [],
          component: 'vtex.undefined-title@0.0.1/UndefinedTitle',
          composition: 'blocks',
          content: {},
          hasContentSchema: false,
          preview: null,
          props: {},
          render: 'server',
          track: [],
        },
      }

      const components = {
        ...COMPONENTS,
        'vtex.empty-string-title@0.0.1/EmptyStringTitle': {
          schema: {
            title: '',
          },
        },
        'vtex.null-title@0.0.1/NullTitle': {
          schema: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            title: null as any,
          },
        },
        'vtex.undefined-title@0.0.1/UndefinedTitle': {
          schema: {
            title: undefined,
          },
        },
      }

      expect(getComponents(extensions, components, 'store.home')).toEqual(
        DEFAULT_EXTENSIONS_COMPONENTS
      )
    })
  })

  it('should use getSchema as fallback for schema', () => {
    const components = {
      'vtex.shelf@1.25.0/Shelf': {
        getSchema: () => ({
          properties: { mock: {} },
          title: 'admin/editor.shelf.title',
          type: 'object',
        }),
        schema: undefined,
      },
    }

    expect(getComponents(EXTENSIONS, components, 'store.home')).toEqual([
      {
        isEditable: true,
        name: 'admin/editor.shelf.title',
        treePath: 'store.home/shelf#home',
      },
    ])
  })

  describe('Warnings for schemas without title', () => {
    it('should call console.warn when component has a schema with no title', () => {
      const EXTENSION_ID = 'store.home/shelf#home/product-summary'

      const extensions = {
        [EXTENSION_ID]: EXTENSIONS[EXTENSION_ID],
      }

      const COMPONENT_ID = 'vtex.product-summary@2.31.0/ProductSummaryCustom'

      const components = {
        [COMPONENT_ID]: {
          schema: {},
        },
      }

      expect(getComponents(extensions, components, 'store.home')).toEqual([])

      expect(spiedConsoleWarn).toHaveBeenCalledTimes(1)
      expect(spiedConsoleWarn).toHaveBeenCalledWith(
        generateWarningMessage(COMPONENT_ID)
      )
    })

    it('should call console.warn when component returns a schema from getSchema with no title', () => {
      const COMPONENT_ID = 'vtex.shelf@1.25.0/Shelf'

      const components = {
        ...COMPONENTS,
        [COMPONENT_ID]: {
          getSchema: () => ({}),
        },
      }

      expect(getComponents(EXTENSIONS, components, 'store.home')).toEqual(
        DEFAULT_EXTENSIONS_COMPONENTS.filter(
          item => item.treePath !== 'store.home/shelf#home'
        )
      )

      expect(spiedConsoleWarn).toHaveBeenCalledTimes(1)
      expect(spiedConsoleWarn).toHaveBeenCalledWith(
        generateWarningMessage(COMPONENT_ID)
      )
    })
  })
})

describe('getParentTreePath', () => {
  it('returns parent treePath', () => {
    expect(getParentTreePath('store.home/shelf#home')).toBe('store.home')
  })

  it('handles strings with no delimiter', () => {
    expect(getParentTreePath('store')).toBe('store')
  })
})

describe('hasContentPropsInSchema', () => {
  it(`should return false when schema isn't type object`, () => {
    expect(hasContentPropsInSchema({ title: 'Test' })).toBe(false)
    expect(hasContentPropsInSchema({ type: 'number' })).toBe(false)
  })

  it(`should return true if there are properties with isLayout falsy`, () => {
    expect(
      hasContentPropsInSchema({
        properties: { test: { isLayout: false } },
        type: 'object',
      })
    ).toBe(true)
    expect(
      hasContentPropsInSchema({ type: 'object', properties: { test: {} } })
    ).toBe(true)
  })

  it(`should return true if there are nested properties with isLayout falsy`, () => {
    expect(
      hasContentPropsInSchema({
        properties: { test: { isLayout: false } },
        type: 'object',
      })
    ).toBe(true)
    expect(
      hasContentPropsInSchema({
        properties: { test: { type: 'object', properties: { lala: {} } } },
        type: 'object',
      })
    ).toBe(true)
  })
})

describe('isRootComponent', () => {
  it(`returns true when called with 'store.home/header.full'`, () => {
    const input: SidebarComponent = {
      isEditable: true,
      name: 'header',
      treePath: 'store.home/header.full',
    }

    const expectedOutput = true

    expect(isRootComponent(2)(input)).toBe(expectedOutput)
  })

  it(`returns true when called with 'store.home/footer'`, () => {
    const input: SidebarComponent = {
      isEditable: true,
      name: 'footer',
      treePath: 'store.home/footer',
    }

    const expectedOutput = true

    expect(isRootComponent(2)(input)).toBe(expectedOutput)
  })

  it(`returns true when called with 'store.home/test'`, () => {
    const input: SidebarComponent = {
      isEditable: true,
      name: 'test',
      treePath: 'store.home/test',
    }

    const expectedOutput = true

    expect(isRootComponent(2)(input)).toBe(expectedOutput)
  })

  it(`returns false when called with 'store.home/header/login'`, () => {
    const input: SidebarComponent = {
      isEditable: true,
      name: 'login',
      treePath: 'store.home/header.full/login',
    }

    const expectedOutput = false

    expect(isRootComponent(2)(input)).toBe(expectedOutput)
  })

  it(`returns false when called with 'store.home/shelf/product-summary'`, () => {
    const input: SidebarComponent = {
      isEditable: true,
      name: 'product-summary',
      treePath: 'store.home/shelf/product-summary',
    }

    const expectedOutput = false

    expect(isRootComponent(2)(input)).toBe(expectedOutput)
  })
})

describe('normalize', () => {
  it('handles empty array inputs', () => {
    const input: SidebarComponent[] = []

    const expectedOutput: NormalizedBlock[] = []

    expect(normalize(input)).toEqual(expectedOutput)
  })

  it('nests store.home/ level components', () => {
    const input: SidebarComponent[] = [
      {
        isEditable: true,
        name: 'editor.footer.title',
        treePath: 'store.home/$after_0',
      },
      {
        isEditable: true,
        name: 'editor.header.title',
        treePath: 'store.home/$before_0',
      },
      {
        isEditable: true,
        name: 'editor.category-menu.title',
        treePath: 'store.home/$before_0/category-menu',
      },
      {
        isEditable: true,
        name: 'editor.login.title',
        treePath: 'store.home/$before_0/login',
      },
      {
        isEditable: true,
        name: 'editor.menu',
        treePath: 'store.home/$before_0/menu-link',
      },
      {
        isEditable: true,
        name: 'editor.minicart.title',
        treePath: 'store.home/$before_0/minicart',
      },
      {
        isEditable: true,
        name: 'editor.carousel.title',
        treePath: 'store.home/carousel#home',
      },
      {
        isEditable: true,
        name: 'editor.shelf.title',
        treePath: 'store.home/shelf#home',
      },
    ]

    const expectedOutput: NormalizedBlock[] = [
      {
        components: [
          {
            components: [],
            isEditable: true,
            isSortable: false,
            name: 'editor.category-menu.title',
            treePath: 'store.home/$before_0/category-menu',
          },
          {
            components: [],
            isEditable: true,
            isSortable: false,
            name: 'editor.login.title',
            treePath: 'store.home/$before_0/login',
          },
          {
            components: [],
            isEditable: true,
            isSortable: false,
            name: 'editor.menu',
            treePath: 'store.home/$before_0/menu-link',
          },
          {
            components: [],
            isEditable: true,
            isSortable: false,
            name: 'editor.minicart.title',
            treePath: 'store.home/$before_0/minicart',
          },
        ],
        isEditable: true,
        isSortable: false,
        name: 'editor.header.title',
        treePath: 'store.home/$before_0',
      },
      {
        components: [],
        isEditable: true,
        isSortable: false,
        name: 'editor.carousel.title',
        treePath: 'store.home/carousel#home',
      },
      {
        components: [],
        isEditable: true,
        isSortable: false,
        name: 'editor.shelf.title',
        treePath: 'store.home/shelf#home',
      },
      {
        components: [],
        isEditable: true,
        isSortable: false,
        name: 'editor.footer.title',
        treePath: 'store.home/$after_0',
      },
    ]

    // Don't consider order here
    expect(normalize(input)).toEqual(expect.arrayContaining(expectedOutput))
  })

  it('preserves multilevel structures', () => {
    const input: SidebarComponent[] = [
      {
        isEditable: true,
        name: 'editor.header.title',
        treePath: 'store.home/$before_0',
      },
      {
        isEditable: true,
        name: 'editor.header.title',
        treePath: 'store.home/$before_0/menu',
      },
      {
        isEditable: true,
        name: 'editor.carousel.title',
        treePath: 'store.home/carousel#home',
      },
      {
        isEditable: true,
        name: 'editor.shelf.title',
        treePath: 'store.home/shelf#home',
      },
      {
        isEditable: true,
        name: 'editor.product-summary.title',
        treePath: 'store.home/shelf#home/product-summary',
      },
      {
        isEditable: true,
        name: 'editor.product-rating.title',
        treePath: 'store.home/shelf#home/product-summary/product-rating',
      },
      {
        isEditable: true,
        name: 'editor.product-rating.start.title',
        treePath: 'store.home/shelf#home/product-summary/product-rating/start',
      },
      {
        isEditable: true,
        name: 'editor.footer.title',
        treePath: 'store.home/$after_0',
      },
    ]

    const expectedOutput: NormalizedBlock[] = [
      {
        components: [
          {
            components: [],
            isEditable: true,
            isSortable: false,
            name: 'editor.header.title',
            treePath: 'store.home/$before_0/menu',
          },
        ],
        isEditable: true,
        isSortable: false,
        name: 'editor.header.title',
        treePath: 'store.home/$before_0',
      },
      {
        components: [],
        isEditable: true,
        isSortable: false,
        name: 'editor.carousel.title',
        treePath: 'store.home/carousel#home',
      },
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    components: [],
                    isEditable: true,
                    isSortable: false,
                    name: 'editor.product-rating.start.title',
                    treePath:
                      'store.home/shelf#home/product-summary/product-rating/start',
                  },
                ],
                isEditable: true,
                isSortable: false,
                name: 'editor.product-rating.title',
                treePath:
                  'store.home/shelf#home/product-summary/product-rating',
              },
            ],
            isEditable: true,
            isSortable: false,
            name: 'editor.product-summary.title',
            treePath: 'store.home/shelf#home/product-summary',
          },
        ],
        isEditable: true,
        isSortable: false,
        name: 'editor.shelf.title',
        treePath: 'store.home/shelf#home',
      },
      {
        components: [],
        isEditable: true,
        isSortable: false,
        name: 'editor.footer.title',
        treePath: 'store.home/$after_0',
      },
    ]

    expect(normalize(input)).toEqual(expectedOutput)
  })

  it('should treat "closest" node as next root', () => {
    const input: SidebarComponent[] = [
      {
        isEditable: true,
        name: 'editor.product-summary.title',
        treePath:
          'store.home/shelf#home/spacer/placeholder/flex/product-summary',
      },
      {
        isEditable: true,
        name: 'editor.product-summary.star.title',
        treePath:
          'store.home/shelf#home/spacer/placeholder/flex/product-summary/star',
      },
      {
        isEditable: true,
        name: 'editor.shelf.title',
        treePath: 'store.home/shelf#home',
      },
    ]

    const expectedOutput: NormalizedBlock[] = [
      {
        components: [
          {
            components: [
              {
                components: [],
                isEditable: true,
                isSortable: false,
                name: 'editor.product-summary.star.title',
                treePath:
                  'store.home/shelf#home/spacer/placeholder/flex/product-summary/star',
              },
            ],
            isEditable: true,
            isSortable: false,
            name: 'editor.product-summary.title',
            treePath:
              'store.home/shelf#home/spacer/placeholder/flex/product-summary',
          },
        ],
        isEditable: true,
        isSortable: false,
        name: 'editor.shelf.title',
        treePath: 'store.home/shelf#home',
      },
    ]

    expect(normalize(input)).toEqual(expectedOutput)
  })

  it('handles unordered components', () => {
    const input: SidebarComponent[] = [
      {
        isEditable: true,
        name: 'editor.footer.title',
        treePath: 'store.home/$after_0',
      },
      {
        isEditable: true,
        name: 'editor.product-summary.title',
        treePath: 'store.home/shelf#home/product-summary',
      },
      {
        isEditable: true,
        name: 'editor.header.title',
        treePath: 'store.home/$before_0',
      },
      {
        isEditable: true,
        name: 'editor.carousel.title',
        treePath: 'store.home/carousel#home',
      },
      {
        isEditable: true,
        name: 'editor.shelf.title',
        treePath: 'store.home/shelf#home',
      },
    ]

    const expectedOutput: NormalizedBlock[] = [
      {
        components: [],
        isEditable: true,
        isSortable: false,
        name: 'editor.header.title',
        treePath: 'store.home/$before_0',
      },
      {
        components: [],
        isEditable: true,
        isSortable: false,
        name: 'editor.carousel.title',
        treePath: 'store.home/carousel#home',
      },
      {
        components: [
          {
            components: [],
            isEditable: true,
            isSortable: false,
            name: 'editor.product-summary.title',
            treePath: 'store.home/shelf#home/product-summary',
          },
        ],
        isEditable: true,
        isSortable: false,
        name: 'editor.shelf.title',
        treePath: 'store.home/shelf#home',
      },
      {
        components: [],
        isEditable: true,
        isSortable: false,
        name: 'editor.footer.title',
        treePath: 'store.home/$after_0',
      },
    ]

    expect(normalize(input)).toEqual(expectedOutput)
  })

  it(`handles components with 'around' blocks`, () => {
    const input: SidebarComponent[] = [
      {
        isEditable: true,
        name: 'editor.header.title',
        treePath: 'store.home/$before_0',
      },
      {
        isEditable: true,
        name: 'editor.carousel.title',
        treePath: 'store.home/carousel#home',
      },
      {
        isEditable: true,
        name: 'editor.product-summary.title',
        treePath: 'store.home/shelf#home/product-summary',
      },
      {
        isEditable: true,
        name: 'editor.around-shelf.title',
        treePath: 'store.home/shelf#home/$around_0',
      },
      {
        isEditable: true,
        name: 'editor.shelf.title',
        treePath: 'store.home/shelf#home',
      },
      {
        isEditable: true,
        name: 'editor.around-carousel.title',
        treePath: 'store.home/carousel#home/$around_0',
      },
      {
        isEditable: true,
        name: 'editor.footer.title',
        treePath: 'store.home/$after_0',
      },
    ]

    const expectedOutput: NormalizedBlock[] = [
      {
        components: [],
        isEditable: true,
        isSortable: false,
        name: 'editor.header.title',
        treePath: 'store.home/$before_0',
      },
      {
        components: [],
        isEditable: true,
        isSortable: false,
        name: 'editor.around-carousel.title',
        treePath: 'store.home/carousel#home/$around_0',
      },
      {
        components: [],
        isEditable: true,
        isSortable: false,
        name: 'editor.carousel.title',
        treePath: 'store.home/carousel#home',
      },
      {
        components: [],
        isEditable: true,
        isSortable: false,
        name: 'editor.around-shelf.title',
        treePath: 'store.home/shelf#home/$around_0',
      },
      {
        components: [
          {
            components: [],
            isEditable: true,
            isSortable: false,
            name: 'editor.product-summary.title',
            treePath: 'store.home/shelf#home/product-summary',
          },
        ],
        isEditable: true,
        isSortable: false,
        name: 'editor.shelf.title',
        treePath: 'store.home/shelf#home',
      },
      {
        components: [],
        isEditable: true,
        isSortable: false,
        name: 'editor.footer.title',
        treePath: 'store.home/$after_0',
      },
    ]

    expect(normalize(input)).toEqual(expectedOutput)
  })

  it('should handle treePaths with same beginning but that are different blocks', () => {
    const input: SidebarComponent[] = [
      {
        isEditable: true,
        name: 'editor.carousel.title',
        treePath: 'store.home/layout#home',
      },
      {
        isEditable: true,
        name: 'editor.product-summary.title',
        treePath: 'store.home/layout#homeCollection',
      },
      {
        isEditable: true,
        name: 'editor.product-summary.title',
        treePath: 'store.home/layout#homeCollection/button',
      },
    ]

    const expectedOutput: NormalizedBlock[] = [
      {
        components: [],
        isEditable: true,
        isSortable: false,
        name: 'editor.carousel.title',
        treePath: 'store.home/layout#home',
      },
      {
        components: [
          {
            components: [],
            isEditable: true,
            isSortable: false,
            name: 'editor.product-summary.title',
            treePath: 'store.home/layout#homeCollection/button',
          },
        ],
        isEditable: true,
        isSortable: false,
        name: 'editor.product-summary.title',
        treePath: 'store.home/layout#homeCollection',
      },
    ]
    const output = normalize(input)

    expect(output).toEqual(expectedOutput)
  })

  it('should put components in closest ancestor', () => {
    const input: SidebarComponent[] = [
      {
        isEditable: true,
        name: 'editor.row.title',
        treePath: 'store.home/flex-layout.row#homeCollections',
      },
      {
        isEditable: true,
        name: 'admin/editor.rich-text.title',
        treePath:
          'store.home/flex-layout.row#homeCollections/flex-layout.col#leftCollection/rich-text#homeCollectionsTitle',
      },
      {
        isEditable: true,
        name: 'admin/editor.info-card.title',
        treePath:
          'store.home/flex-layout.row#homeCollections/flex-layout.col#middleCollection/flex-layout.row#homeCollectionsBottom/info-card#homeBannerDCComics',
      },
      {
        isEditable: true,
        name: 'admin/editor.info-card.title',
        treePath:
          'store.home/flex-layout.row#homeCollections/flex-layout.col#middleCollection/flex-layout.row#homeCollectionsBottom/info-card#homeBannerMarvel',
      },
      {
        isEditable: true,
        name: 'admin/editor.info-card.title',
        treePath:
          'store.home/flex-layout.row#homeCollections/flex-layout.col#middleCollection/flex-layout.row#homeCollectionsTop/info-card#homeBannerAngel',
      },
      {
        isEditable: true,
        name: 'admin/editor.info-card.title',
        treePath:
          'store.home/flex-layout.row#homeCollections/flex-layout.col#middleCollection/flex-layout.row#homeCollectionsTop/info-card#homeBannerSeaHunter',
      },
      {
        isEditable: true,
        name: 'admin/editor.info-card.title',
        treePath:
          'store.home/flex-layout.row#homeCollections/flex-layout.col#rightCollection/info-card#homeCollectionsDisney',
      },
    ]

    const expectedOutput: NormalizedBlock[] = [
      {
        components: [
          {
            components: [],
            isEditable: true,
            isSortable: false,
            name: 'admin/editor.rich-text.title',
            treePath:
              'store.home/flex-layout.row#homeCollections/flex-layout.col#leftCollection/rich-text#homeCollectionsTitle',
          },
          {
            components: [],
            isEditable: true,
            isSortable: false,
            name: 'admin/editor.info-card.title',
            treePath:
              'store.home/flex-layout.row#homeCollections/flex-layout.col#middleCollection/flex-layout.row#homeCollectionsBottom/info-card#homeBannerDCComics',
          },
          {
            components: [],
            isEditable: true,
            isSortable: false,
            name: 'admin/editor.info-card.title',
            treePath:
              'store.home/flex-layout.row#homeCollections/flex-layout.col#middleCollection/flex-layout.row#homeCollectionsBottom/info-card#homeBannerMarvel',
          },
          {
            components: [],
            isEditable: true,
            isSortable: false,
            name: 'admin/editor.info-card.title',
            treePath:
              'store.home/flex-layout.row#homeCollections/flex-layout.col#middleCollection/flex-layout.row#homeCollectionsTop/info-card#homeBannerAngel',
          },
          {
            components: [],
            isEditable: true,
            isSortable: false,
            name: 'admin/editor.info-card.title',
            treePath:
              'store.home/flex-layout.row#homeCollections/flex-layout.col#middleCollection/flex-layout.row#homeCollectionsTop/info-card#homeBannerSeaHunter',
          },
          {
            components: [],
            isEditable: true,
            isSortable: false,
            name: 'admin/editor.info-card.title',
            treePath:
              'store.home/flex-layout.row#homeCollections/flex-layout.col#rightCollection/info-card#homeCollectionsDisney',
          },
        ],
        isEditable: true,
        isSortable: false,
        name: 'editor.row.title',
        treePath: 'store.home/flex-layout.row#homeCollections',
      },
    ]

    expect(normalize(input)).toEqual(expectedOutput)
  })
})
