const mongoose = require("mongoose");
const Car = require("./models/Car");
console.log("update");

const updateAllDocuments = async () => {
  try {
    // Kết nối MongoDB (thay chuỗi kết nối phù hợp với dự án của bạn)
    await mongoose.connect("mongodb://localhost:27017/coder_cars", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Thêm key-value mới cho tất cả document
    const result = await Car.updateMany(
      {}, // Điều kiện rỗng {} để áp dụng cho tất cả document
      { $set: { isDeleted: false } } // Cặp key-value cần thêm
    );

    console.log("Matched documents:", result.matchedCount);
    console.log("Modified documents:", result.modifiedCount);
  } catch (err) {
    console.error("Error updating documents:", err);
  } finally {
    // Đóng kết nối
    await mongoose.connection.close();
  }
};

updateAllDocuments();
