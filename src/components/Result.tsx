import { useState } from "react";
import { db } from "./common/db"
import { useLiveQuery } from "dexie-react-hooks";

export const Result = () => {
    
    // const friends =  db.friends
    //         .where('age')
    //         .equalsIgnoreCase('new user');

    // console.log(friends);
    
    // friends.each(function(friend) {
    //     console.log('name: ' + friend.name + ', age: ' + friend.age);
    // });

    return (
        <>
            <p>Result画面</p>
            <h1>My simple Dexie app</h1>

            <h2>Add Friend</h2>
            <AddFriendForm defaultAge={21} />

            <h2>Friend List</h2>
            <FriendList minAge={10} maxAge={650} />

        </>
    );
}

const AddFriendForm = ({defaultAge} = {defaultAge: 21}) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState(defaultAge);
    const [status, setStatus] = useState("");
  
    async function addFriend() {
      try {
  
        // Add the new friend!
        const id = await db.friends.add({
          name,
          age
        });
  
        setStatus(`Friend ${name} successfully added. Got id ${id}`);
        setName("");
        setAge(defaultAge);
      } catch (error) {
        setStatus(`Failed to add ${name}: ${error}`);
      }
    }
  
    return <>
      <p>
        {status}
      </p>
      Name:
      <input
        type="text"
        value={name}
        onChange={ev => setName(ev.target.value)}
      />
      Age:
      <input
        type="number"
        value={age}
        onChange={ev => setAge(Number(ev.target.value))}
      />
      
      <button onClick={addFriend}>
        Add
      </button>
    </>
  }

  type ageProps = {
      minAge:number,
      maxAge:number
  }

  const FriendList: React.VFC<ageProps> = ({minAge,maxAge}) => {
    // const friends = useLiveQuery(
    //   async () => {
    //     //
    //     // Query Dexie's API
    //     //
    //     const friends = await db.friends
    //       .where('age')
    //       .between(minAge, maxAge)
    //       .toArray();
        

          
    //     // Return result
    //     return friends;
    //   },
    //   // specify vars that affect query:
    //   [minAge, maxAge] 
    // );
    const friends = useLiveQuery(() => {
        const friends =  db.friends.toArray();
        return friends;
      }
    );

    // console.log(friends);
    // const friends = db.friends.get({name: "new user"})
    // .then((friends)=>{
    //   console.log(friends)})
    // .catch((error)=>{
    //   console.error(error);
    // });
      
    //const friends =  db.friends.toArray().then(x => x.map((y)=> console.log(y)));
    

    return (
      <>
        <ul>
          {friends?.map(friend => <li key={friend.id}>
            {friend.name}, {friend.age}
          </li>)}
        </ul>
        <p>{}</p>
      </>
      );
  }