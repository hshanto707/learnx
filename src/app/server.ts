import app from './app'
import mongoose from 'mongoose';
import config from './config';

async function main() {
  try {
    await mongoose.connect(config.dbUrl as string);

    app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`)
    });
  } catch (err) {
    console.log(err);
    throw(err);
  }
}

main();
