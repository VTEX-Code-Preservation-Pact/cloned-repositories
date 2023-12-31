export const parsedProtocol = {
  items: [
    {
      id: '33',
      productId: '18',
      refId: null,
      ean: '123456789154',
      name: 'Luxury Purple Ballon Luxury Purple Client Ballon',
      skuName: 'Luxury Purple Client Ballon',
      modalType: null,
      productCategoryIds: '/1/2/7/',
      productCategories: {
        '1': 'Departamento 1',
        '2': 'Categoria 2',
        '7': 'Sub-Categoria 7',
      },
      availability: 'available',
      measurementUnit: 'un',
      variations: [
        {
          index: 0,
          assemblies: [],
          tax: 0,
          price: 1000,
          listPrice: 1000,
          manualPrice: null,
          sellingPrice: 1000,
          isGift: false,
          quantity: 2,
          attachments: [],
          attachmentOfferings: [],
          offerings: [],
          priceTags: [],
          unitMultiplier: 1,
          seller: '1',
          sellerChain: ['1'],
        },
        {
          index: 1,
          assemblies: [],
          tax: 0,
          price: 1000,
          listPrice: 1000,
          manualPrice: null,
          sellingPrice: 300,
          isGift: false,
          quantity: 1,
          attachments: [],
          attachmentOfferings: [],
          offerings: [],
          priceTags: [
            {
              name:
                'discount@price-3f0c2115-10a6-4fda-aec4-5950d8de9a6c#52351d37-737a-4ab4-9725-a98f1847a6be',
              value: -700,
              rawValue: -7,
              isPercentual: false,
              identifier: '3f0c2115-10a6-4fda-aec4-5950d8de9a6c',
            },
          ],
          unitMultiplier: 1,
          seller: '1',
          sellerChain: ['1'],
        },
      ],
    },
    {
      id: '5',
      productId: '3',
      refId: null,
      ean: '123456789127',
      name: 'Produto 3 SKU 5',
      skuName: 'SKU 5',
      modalType: null,
      productCategoryIds: '/1/2/7/',
      productCategories: {
        '1': 'Departamento 1',
        '2': 'Categoria 2',
        '7': 'Sub-Categoria 7',
      },
      availability: 'available',
      measurementUnit: 'un',
      variations: [
        {
          index: 2,
          assemblies: [],
          tax: 0,
          price: 135714,
          listPrice: 135714,
          manualPrice: null,
          sellingPrice: 135714,
          isGift: false,
          quantity: 1,
          attachments: [],
          attachmentOfferings: [],
          offerings: [],
          priceTags: [],
          unitMultiplier: 1,
          seller: '1',
          sellerChain: ['1'],
        },
      ],
    },
    {
      id: '30',
      productId: '15',
      refId: null,
      ean: '123456789152',
      name: 'Produto 15 (Assinatura) SKU 30 (Assinatura)',
      skuName: 'SKU 30 (Assinatura)',
      modalType: null,
      productCategoryIds: '/1/2/7/',
      productCategories: {
        '1': 'Departamento 1',
        '2': 'Categoria 2',
        '7': 'Sub-Categoria 7',
      },
      availability: 'available',
      measurementUnit: 'un',
      variations: [
        {
          index: 3,
          assemblies: [],
          tax: 0,
          price: 2000,
          listPrice: 2000,
          manualPrice: null,
          sellingPrice: 2000,
          isGift: false,
          quantity: 1,
          attachments: [
            {
              name: 'vtex.subscription.assinatura',
              content: {
                'vtex.subscription.key.frequency': '1 day',
              },
            },
          ],
          attachmentOfferings: [
            {
              name: 'vtex.subscription.assinatura',
              required: false,
              schema: {
                'vtex.subscription.key.frequency': {
                  maximumNumberOfCharacters: 5,
                  domain: ['1 day'],
                },
              },
            },
          ],
          offerings: [],
          priceTags: [],
          unitMultiplier: 1,
          seller: '1',
          sellerChain: ['1'],
        },
        {
          index: 4,
          assemblies: [],
          tax: 0,
          price: 2000,
          listPrice: 2000,
          manualPrice: null,
          sellingPrice: 2000,
          isGift: false,
          quantity: 2,
          attachments: [
            {
              name: 'vtex.subscription.assinatura',
              content: {
                'vtex.subscription.key.frequency': '1 day',
              },
            },
          ],
          attachmentOfferings: [
            {
              name: 'vtex.subscription.assinatura',
              required: false,
              schema: {
                'vtex.subscription.key.frequency': {
                  maximumNumberOfCharacters: 5,
                  domain: ['1 day'],
                },
              },
            },
          ],
          offerings: [],
          priceTags: [],
          unitMultiplier: 1,
          seller: '1',
          sellerChain: ['1'],
        },
        {
          index: 5,
          assemblies: [],
          tax: 0,
          price: 2000,
          listPrice: 2000,
          manualPrice: null,
          sellingPrice: 2000,
          isGift: false,
          quantity: 1,
          attachments: [],
          attachmentOfferings: [
            {
              name: 'vtex.subscription.assinatura',
              required: false,
              schema: {
                'vtex.subscription.key.frequency': {
                  maximumNumberOfCharacters: 5,
                  domain: ['1 day'],
                },
              },
            },
          ],
          offerings: [],
          priceTags: [],
          unitMultiplier: 1,
          seller: '1',
          sellerChain: ['1'],
        },
      ],
    },
  ],
  customData: {
    customApps: [
      {
        fields: {
          quantity: '44',
        },
        id: 'customer-credit',
        major: 1,
      },
    ],
  },
  shippingData: {
    logisticsInfo: [
      {
        itemIndex: 0,
        selectedSla: 'ME Transportadora Genérica',
        selectedDeliveryChannel: 'delivery',
        addressId: '4830634440150',
        slas: [
          {
            id: 'ME Transportadora Genérica',
            deliveryChannel: 'delivery',
            name: 'ME Transportadora Genérica',
            deliveryIds: [
              {
                courierId: 'IDTransportadoraGenerica',
                warehouseId: 'IDEstoqueGenerico',
                dockId: 'IDDocaGenerica',
                courierName: 'Transportadora Genérica',
                quantity: 2,
                kitItemDetails: [],
              },
            ],
            shippingEstimate: '8bd',
            shippingEstimateDate: null,
            lockTTL: null,
            availableDeliveryWindows: [],
            deliveryWindow: null,
            price: 1348,
            listPrice: 1348,
            tax: 0,
            pickupStoreInfo: {
              isPickupStore: false,
              friendlyName: null,
              address: null,
              additionalInfo: null,
              dockId: null,
            },
            pickupPointId: null,
            pickupDistance: 0,
            polygonName: null,
            transitTime: '0bd',
          },
        ],
        shipsTo: ['BRA'],
        itemId: '33',
        deliveryChannels: [
          {
            id: 'delivery',
          },
        ],
      },
      {
        itemIndex: 1,
        selectedSla: 'ME Transportadora Genérica',
        selectedDeliveryChannel: 'delivery',
        addressId: '4830634440150',
        slas: [
          {
            id: 'ME Transportadora Genérica',
            deliveryChannel: 'delivery',
            name: 'ME Transportadora Genérica',
            deliveryIds: [
              {
                courierId: 'IDTransportadoraGenerica',
                warehouseId: 'IDEstoqueGenerico',
                dockId: 'IDDocaGenerica',
                courierName: 'Transportadora Genérica',
                quantity: 1,
                kitItemDetails: [],
              },
            ],
            shippingEstimate: '8bd',
            shippingEstimateDate: null,
            lockTTL: null,
            availableDeliveryWindows: [],
            deliveryWindow: null,
            price: 673,
            listPrice: 673,
            tax: 0,
            pickupStoreInfo: {
              isPickupStore: false,
              friendlyName: null,
              address: null,
              additionalInfo: null,
              dockId: null,
            },
            pickupPointId: null,
            pickupDistance: 0,
            polygonName: null,
            transitTime: '0bd',
          },
        ],
        shipsTo: ['BRA'],
        itemId: '33',
        deliveryChannels: [
          {
            id: 'delivery',
          },
        ],
      },
      {
        itemIndex: 2,
        selectedSla: 'ME Transportadora Produto 3',
        selectedDeliveryChannel: 'delivery',
        addressId: '4830634440150',
        slas: [
          {
            id: 'ME Transportadora Produto 3',
            deliveryChannel: 'delivery',
            name: 'ME Transportadora Produto 3',
            deliveryIds: [
              {
                courierId: 'IDTransportadoraProduto3',
                warehouseId: 'IDEstoqueProduto3',
                dockId: 'IDDocaProduto3',
                courierName: 'Transportadora Produto 3',
                quantity: 1,
                kitItemDetails: [],
              },
            ],
            shippingEstimate: '1bd',
            shippingEstimateDate: null,
            lockTTL: null,
            availableDeliveryWindows: [],
            deliveryWindow: null,
            price: 39314,
            listPrice: 39314,
            tax: 0,
            pickupStoreInfo: {
              isPickupStore: false,
              friendlyName: null,
              address: null,
              additionalInfo: null,
              dockId: null,
            },
            pickupPointId: null,
            pickupDistance: 0,
            polygonName: null,
            transitTime: '0bd',
          },
          {
            id: 'ME Transportadora Produto 1',
            deliveryChannel: 'delivery',
            name: 'ME Transportadora Produto 1',
            deliveryIds: [
              {
                courierId: 'IDTransportadoraProduto1',
                warehouseId: 'IDEstoqueProduto3',
                dockId: 'IDDocaProduto123',
                courierName: 'Transportadora Produto 1',
                quantity: 1,
                kitItemDetails: [],
              },
            ],
            shippingEstimate: '3bd',
            shippingEstimateDate: null,
            lockTTL: null,
            availableDeliveryWindows: [],
            deliveryWindow: null,
            price: 39314,
            listPrice: 39314,
            tax: 0,
            pickupStoreInfo: {
              isPickupStore: false,
              friendlyName: null,
              address: null,
              additionalInfo: null,
              dockId: null,
            },
            pickupPointId: null,
            pickupDistance: 0,
            polygonName: null,
            transitTime: '0bd',
          },
          {
            id: 'ME Transportadora Produto 2',
            deliveryChannel: 'delivery',
            name: 'ME Transportadora Produto 2',
            deliveryIds: [
              {
                courierId: 'IDTransportadoraProduto2',
                warehouseId: 'IDEstoqueProduto3',
                dockId: 'IDDocaProduto123',
                courierName: 'Transportadora Produto 2',
                quantity: 1,
                kitItemDetails: [],
              },
            ],
            shippingEstimate: '3bd',
            shippingEstimateDate: null,
            lockTTL: null,
            availableDeliveryWindows: [],
            deliveryWindow: null,
            price: 39314,
            listPrice: 39314,
            tax: 0,
            pickupStoreInfo: {
              isPickupStore: false,
              friendlyName: null,
              address: null,
              additionalInfo: null,
              dockId: null,
            },
            pickupPointId: null,
            pickupDistance: 0,
            polygonName: null,
            transitTime: '0bd',
          },
        ],
        shipsTo: ['BRA'],
        itemId: '5',
        deliveryChannels: [
          {
            id: 'delivery',
          },
        ],
      },
      {
        itemIndex: 3,
        selectedSla: 'ME Transportadora Genérica',
        selectedDeliveryChannel: 'delivery',
        addressId: '4830634440150',
        slas: [
          {
            id: 'ME Transportadora Genérica',
            deliveryChannel: 'delivery',
            name: 'ME Transportadora Genérica',
            deliveryIds: [
              {
                courierId: 'IDTransportadoraGenerica',
                warehouseId: 'IDEstoqueGenerico',
                dockId: 'IDDocaGenerica',
                courierName: 'Transportadora Genérica',
                quantity: 1,
                kitItemDetails: [],
              },
            ],
            shippingEstimate: '8bd',
            shippingEstimateDate: null,
            lockTTL: null,
            availableDeliveryWindows: [],
            deliveryWindow: null,
            price: 674,
            listPrice: 674,
            tax: 0,
            pickupStoreInfo: {
              isPickupStore: false,
              friendlyName: null,
              address: null,
              additionalInfo: null,
              dockId: null,
            },
            pickupPointId: null,
            pickupDistance: 0,
            polygonName: null,
            transitTime: '0bd',
          },
        ],
        shipsTo: ['BRA'],
        itemId: '30',
        deliveryChannels: [
          {
            id: 'delivery',
          },
        ],
      },
      {
        itemIndex: 4,
        selectedSla: 'ME Transportadora Genérica',
        selectedDeliveryChannel: 'delivery',
        addressId: '4830634440150',
        slas: [
          {
            id: 'ME Transportadora Genérica',
            deliveryChannel: 'delivery',
            name: 'ME Transportadora Genérica',
            deliveryIds: [
              {
                courierId: 'IDTransportadoraGenerica',
                warehouseId: 'IDEstoqueGenerico',
                dockId: 'IDDocaGenerica',
                courierName: 'Transportadora Genérica',
                quantity: 2,
                kitItemDetails: [],
              },
            ],
            shippingEstimate: '8bd',
            shippingEstimateDate: null,
            lockTTL: null,
            availableDeliveryWindows: [],
            deliveryWindow: null,
            price: 1348,
            listPrice: 1348,
            tax: 0,
            pickupStoreInfo: {
              isPickupStore: false,
              friendlyName: null,
              address: null,
              additionalInfo: null,
              dockId: null,
            },
            pickupPointId: null,
            pickupDistance: 0,
            polygonName: null,
            transitTime: '0bd',
          },
        ],
        shipsTo: ['BRA'],
        itemId: '30',
        deliveryChannels: [
          {
            id: 'delivery',
          },
        ],
      },
      {
        itemIndex: 5,
        selectedSla: 'ME Transportadora Genérica',
        selectedDeliveryChannel: 'delivery',
        addressId: '4830634440150',
        slas: [
          {
            id: 'ME Transportadora Genérica',
            deliveryChannel: 'delivery',
            name: 'ME Transportadora Genérica',
            deliveryIds: [
              {
                courierId: 'IDTransportadoraGenerica',
                warehouseId: 'IDEstoqueGenerico',
                dockId: 'IDDocaGenerica',
                courierName: 'Transportadora Genérica',
                quantity: 1,
                kitItemDetails: [],
              },
            ],
            shippingEstimate: '8bd',
            shippingEstimateDate: null,
            lockTTL: null,
            availableDeliveryWindows: [],
            deliveryWindow: null,
            price: 673,
            listPrice: 673,
            tax: 0,
            pickupStoreInfo: {
              isPickupStore: false,
              friendlyName: null,
              address: null,
              additionalInfo: null,
              dockId: null,
            },
            pickupPointId: null,
            pickupDistance: 0,
            polygonName: null,
            transitTime: '0bd',
          },
        ],
        shipsTo: ['BRA'],
        itemId: '30',
        deliveryChannels: [
          {
            id: 'delivery',
          },
        ],
      },
    ],
    selectedAddresses: [
      {
        addressType: 'residential',
        receiverName: 'PEd** ****',
        addressId: '4830634440150',
        isDisposable: false,
        postalCode: '******000',
        city: 'e',
        state: 'MS',
        country: 'BRA',
        street: 'e',
        number: '*',
        neighborhood: 'e',
        complement: '*',
        reference: null,
        geoCoordinates: [],
      },
    ],
  },
  clientProfileData: {
    email: 'pedrovtex1@gmail.com',
    firstName: 'PEd**',
    lastName: 'Cru*',
    document: '*9*2*9*6*8*',
    documentType: 'cpf',
    phone: '**********9999',
    corporateName: null,
    tradeName: null,
    corporateDocument: null,
    stateInscription: null,
    corporatePhone: null,
    isCorporate: false,
    profileCompleteOnLoading: true,
    profileErrorOnLoading: false,
    customerClass: null,
  },
  marketingData: null,
  paymentData: {
    payments: [
      {
        paymentSystem: '4',
        bin: '544444',
        accountId: 'F4AB2D372E3A4303BB9482BD826525EF',
        tokenId: null,
        installments: 2,
        referenceValue: 190044,
        value: 190044,
        merchantSellerPayments: [
          {
            id: 'PEDROCRUZ',
            installments: 2,
            referenceValue: 190044,
            value: 190044,
            interestRate: 0,
            installmentValue: 95022,
          },
        ],
      },
    ],
  },
}
