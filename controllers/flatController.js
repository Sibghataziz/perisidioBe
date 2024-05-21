import FlatServices from "../dbServices/flatServices.js";

async function addFlat(req, res) {
  try {
    const requestedFlat = req.body;
    if (
      !requestedFlat.address1 ||
      !requestedFlat.city ||
      !requestedFlat.state ||
      !requestedFlat.country ||
      !requestedFlat.postCode ||
      !requestedFlat.area ||
      !requestedFlat.numberOfBedrooms
    ) {
      throw Error("required fields are empty!");
    }
    requestedFlat.userId = req.user._id.toString();
    await FlatServices.insertFlat(requestedFlat);
    return res.status(201).send({
      status: 1,
      message: "Flat successfully added",
    });
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error.message,
    });
  }
}

async function getFlats(req, res) {
  try {
    let {
      city,
      state,
      country,
      area,
      numberOfBedrooms,
      numberOfWashroom,
      nearestHospitalDistance,
      nearestCollegeDistance,
      userId,
      pageNo,
      pageSize,
    } = req.query;
    const query = {};
    if (city) {
      query.city = city;
    }

    if (state) {
      query.state = state;
    }

    if (country) {
      query.country = country;
    }

    if (area) {
      query.area = area;
    }

    if (numberOfBedrooms) {
      query.numberOfBedrooms = numberOfBedrooms;
    }

    if (numberOfWashroom) {
      query.numberOfWashroom = numberOfWashroom;
    }

    if (nearestHospitalDistance) {
      query.nearestHospitalDistance = nearestHospitalDistance;
    }

    if (nearestCollegeDistance) {
      query.nearestCollegeDistance = nearestCollegeDistance;
    }

    if (userId) {
      query.userId = userId;
    }

    pageNo = pageNo ? pageNo : 1;
    pageSize = pageSize ? pageSize : 10;
    const flats = await FlatServices.findFlatsByQueryWithPagination(
      query,
      pageNo,
      pageSize
    );

    return res.status(200).send({
      status: 1,
      data: flats,
    });
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error.message,
    });
  }
}

async function editFlat(req, res) {
  try {
    const requestedFlat = req.body;
    const flatId = req.params.flatId;
    if (
      !requestedFlat.address1 ||
      !requestedFlat.city ||
      !requestedFlat.state ||
      !requestedFlat.country ||
      !requestedFlat.postCode ||
      !requestedFlat.area ||
      !requestedFlat.numberOfBedrooms
    ) {
      throw Error("required fields are empty!");
    }
    const flat = await FlatServices.findOneFlatByQuery({
      _id: flatId,
    });
    if (!flat) {
      throw Error("invalid flat id");
    }
    if (flat.userId !== req.user._id.toString()) {
      throw Error("you cannot edit others flat");
    }
    await FlatServices.updateOneFlat(
      {
        _id: flatId,
      },
      requestedFlat
    );

    return res.status(201).send({
      status: 1,
      message: "Flat successfully updated",
    });
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error.message,
    });
  }
}

async function deleteFlat(req, res) {
  try {
    const flatId = req.params.flatId;
    const flat = await FlatServices.findOneFlatByQuery({
      _id: flatId,
    });
    if (!flat) {
      throw Error("invalid flat id");
    }
    console.log(flat, 'flat');
    console.log(req.user._id, 'user');
    if (flat.userId !== req.user._id.toString()) {
      throw Error("you cannot delete others flat");
    }
    await FlatServices.deleteOneFlat({
      _id: flatId,
    });
    return res.status(201).send({
      status: 1,
      message: "Flat successfully deleted",
    });
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error.message,
    });
  }
}

export default {
    addFlat,
    editFlat,
    getFlats,
    deleteFlat
}
