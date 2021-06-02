import firebase from 'firebase'

export const testListItemModel = (testListItem: firebase.firestore.DocumentData) => {
  return {
    id: testListItem?.id,
    idDoc: testListItem.idDoc,
    testDescription: testListItem.testDescription,
    testEndDate: testListItem.testEndDate,
    testName: testListItem.testName,
    type: testListItem.type,
    questions: testListItem.questions,
    forGroup: testListItem.forGroup,
    whoCreated: testListItem.whoCreated,
    isActiveOnExpiration: testListItem.isActiveOnExpiration
  }
}
