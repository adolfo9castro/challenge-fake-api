import Deliveries from '@/models/Deliveries.model';

const search = async (req) => {
  const {
    dateFrom,
    dateTo,
    weight,
    page,
    limit
  } = req.body,
  sort = { _id: 1 }

  const findDeliveries = {
    "when": {
      "$gte": dateFrom,
      "$lt": dateTo
    }
  }

  const findProduct = {
    path: 'products',
    match: {
      "weight": {
        "$gte": weight
      }
    }
  }

  const totalResults = await Deliveries.find(findDeliveries).populate(findProduct).countDocuments();

  const deliveriesFound = await Deliveries.
    find(findDeliveries).
    populate(findProduct).
    skip(parseInt(page)).
    sort(sort).
    limit(parseInt(limit)).
    exec()

  return {
    totalResults: totalResults,
    deliveriesFound
  }
}

export default search

