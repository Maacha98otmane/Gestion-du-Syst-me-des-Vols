module.exports = queries = {
    vol_from: () => `SELECT * FROM from_vl`,

    vol_to: () => `SELECT * FROM to_vl`,

    getvol: (from, to, date) =>
        `select from_vl.name AS Depart, to_vl.name AS Arrived, vol.* ,DATE_FORMAT(vol.departdate, "%d/%m/%Y at %H:%i:%s") AS avd,
        DATE_FORMAT(vol.arrivaldate, "%d/%m/%Y at %H:%i:%s") AS ard
    from from_vl,to_vl,vol 
    where from_vl.id = ${from} 
    and  to_vl.id= ${to}
    and vol.vol_from = from_vl.id 
    and  vol.vol_to = to_vl.id
    and vol.departdate >'${date}'`,

}