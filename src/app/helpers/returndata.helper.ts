import firebase from 'firebase'

export const retornaData = (snapshot : firebase.firestore.QuerySnapshot ) => {
    const documentos : any[] = [];
    snapshot.forEach(sh => {
        documentos.push({
          id: sh.id,
          ...sh.data()
        })
      })
    return documentos
}

export const arreglarObjeto = (parm: any) => {
  if(parm === null){return [];}
  const item : any[] = [];
  Object.keys(parm).forEach( key => {
    const obj = parm[key];
    obj.id = key;
    item.push(obj);
  })
  return item;
}