/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProducto = /* GraphQL */ `
  mutation CreateProducto(
    $input: CreateProductoInput!
    $condition: ModelProductoConditionInput
  ) {
    createProducto(input: $input, condition: $condition) {
      id
      product
      price
      class
      key
      group
      subGroup
      commission
      unit
      createdAt
      updatedAt
    }
  }
`;
export const updateProducto = /* GraphQL */ `
  mutation UpdateProducto(
    $input: UpdateProductoInput!
    $condition: ModelProductoConditionInput
  ) {
    updateProducto(input: $input, condition: $condition) {
      id
      product
      price
      class
      key
      group
      subGroup
      commission
      unit
      createdAt
      updatedAt
    }
  }
`;
export const deleteProducto = /* GraphQL */ `
  mutation DeleteProducto(
    $input: DeleteProductoInput!
    $condition: ModelProductoConditionInput
  ) {
    deleteProducto(input: $input, condition: $condition) {
      id
      product
      price
      class
      key
      group
      subGroup
      commission
      unit
      createdAt
      updatedAt
    }
  }
`;
