const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt, 
  GraphQLList, 
  GraphQLSchema 
} = require('graphql');
const dataJson = require('./customers.json');

const TotalType = new GraphQLObjectType({
  name: 'Total',
  fields: () => ({
    city: { type: GraphQLString },
    customers_total: { type: GraphQLInt },
    customers_of_the_city: { type: ListType }
  })
});

const ListType = new GraphQLObjectType({
  name: 'List',
  fields: () => ({
    id: { type: GraphQLInt },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    company: { type: GraphQLString },
    customer: { type: CustomerType }
  })
});

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLInt },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GraphQLString },
    company: { type: GraphQLString },
    city: { type: GraphQLString },
    title: { type: GraphQLString },
    lat: { type: GraphQLString },
    long: { type: GraphQLString },
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    total: {
      type: TotalType,
      resolve() {
        return dataJson;
      }
    },
    list: {
      type: new GraphQLList(ListType),
      resolve() {
        return dataJson;
      }
    },
    customer: {
      type: CustomerType,
      args: { 
        id: { type: GraphQLInt } 
      },
      resolve(parent, args) {
        return dataJson[args.id-1];
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
