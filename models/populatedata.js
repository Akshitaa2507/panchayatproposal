const mongoose = require('mongoose');
const User = require('./user');

(async () => {
    try {
        await mongoose.connect("mongodb+srv://akshita:Destiny%402025@cluster0.cbpad35.mongodb.net/mydatabase", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        const districts = [
            { name: 'District A', collectorName: 'Collector A', collectorPhone: '+911234567890', collectorEmail: 'collectorA@example.com' },
            { name: 'District B', collectorName: 'Collector B', collectorPhone: '+911234567891', collectorEmail: 'collectorB@example.com' },
            { name: 'District C', collectorName: 'Collector C', collectorPhone: '+911234567892', collectorEmail: 'collectorC@example.com' },
            { name: 'District D', collectorName: 'Collector D', collectorPhone: '+911234567893', collectorEmail: 'collectorD@example.com' },
            { name: 'District E', collectorName: 'Collector E', collectorPhone: '+911234567894', collectorEmail: 'collectorE@example.com' }
        ];

        for (let i = 0; i < districts.length; i++) {
            const { name, collectorName, collectorPhone, collectorEmail } = districts[i];
            // Create and save district as a user with role 'dc'
            const newDistrict = new User({
                userID: `district_${i}`,
                name: collectorName,
                email: collectorEmail,
                phone: collectorPhone,
                role: 'dc'
            });
            await newDistrict.save();
            console.log(`District "${name}" saved with ID: ${newDistrict._id}`);

            // Populate BDOs and Panchayats
            for (let j = 1; j <= 10; j++) {
                const bdo = new User({
                    userID: `bdo_${i}_${j}`,
                    name: `BDO ${j}`,
                    email: `bdo${j}@example.com`,
                    phone: `+91XXXXXXXX${j.toString().padStart(2, '0')}`,
                    role: 'bdo',
                    district: newDistrict._id
                });
                await bdo.save();
                console.log(`BDO "${bdo.name}" saved with ID: ${bdo._id}`);

                for (let k = 1; k <= 20; k++) {
                    const panchayat = new User({
                        userID: `panchayat_${i}_${j}_${k}`,
                        name: `Panchayat ${k}`,
                        email: `panchayat${k}@example.com`,
                        phone: `+91XXXXXXXX${k.toString().padStart(2, '0')}`,
                        role: 'panchayat',
                        district: newDistrict._id,
                        bdo: bdo._id
                    });
                    await panchayat.save();
                    console.log(`Panchayat "${panchayat.name}" saved with ID: ${panchayat._id}`);
                }
            }
        }
        console.log('Database populated successfully');
        process.exit(0);
    } catch (err) {
        console.error('Error populating database:', err);
        process.exit(1);
    }
})();

// const mongoose = require('mongoose');
// const User = require('./user');
// const District = require('./District');

// (async () => {
//     try {
//         await mongoose.connect("mongodb+srv://akshita:Destiny%402025@cluster0.cbpad35.mongodb.net/mydatabase", {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log('Connected to MongoDB');

//         const districts = [
//             { name: 'District A', collectorName: 'Collector A', collectorPhone: '+911234567890', collectorEmail: 'collectorA@example.com' },
//             { name: 'District B', collectorName: 'Collector B', collectorPhone: '+911234567891', collectorEmail: 'collectorB@example.com' },
//             { name: 'District C', collectorName: 'Collector C', collectorPhone: '+911234567892', collectorEmail: 'collectorC@example.com' },
//             { name: 'District D', collectorName: 'Collector D', collectorPhone: '+911234567893', collectorEmail: 'collectorD@example.com' },
//             { name: 'District E', collectorName: 'Collector E', collectorPhone: '+911234567894', collectorEmail: 'collectorE@example.com' }
//         ];

//         for (let i = 0; i < districts.length; i++) {
//             const { name, collectorName, collectorPhone, collectorEmail } = districts[i];
//             // Create and save district
//             const newDistrict = new District({
//                 name: name,
//                 collectorName: collectorName,
//                 collectorPhone: collectorPhone,
//                 collectorEmail: collectorEmail
//             });
//             await newDistrict.save();
//             console.log(`District "${name}" saved with ID: ${newDistrict._id}`);

//             // Populate BDOs and Panchayats
//             for (let j = 1; j <= 10; j++) {
//                 const bdo = new User({
//                     userID: `bdo_${i}_${j}`,
//                     name: `BDO ${j}`,
//                     email: `bdo${j}@example.com`,
//                     phone: `+91XXXXXXXX${j.toString().padStart(2, '0')}`,
//                     role: 'bdo',
//                     district: newDistrict._id
//                 });
//                 await bdo.save();
//                 for (let k = 1; k <= 20; k++) {
//                     const panchayat = new User({
//                         userID: `panchayat_${i}_${j}_${k}`,
//                         name: `Panchayat ${k}`,
//                         email: `panchayat${k}@example.com`,
//                         phone: `+91XXXXXXXX${k.toString().padStart(2, '0')}`,
//                         role: 'panchayat',
//                         district: newDistrict._id,
//                         bdo: bdo._id
//                     });
//                     await panchayat.save();
//                 }
//             }
//         }
//         console.log('Database populated successfully');
//         process.exit(0);
//     } catch (err) {
//         console.error('Error populating database:', err);
//         process.exit(1);
//     }
// })();
