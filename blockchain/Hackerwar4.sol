// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
contract Details {
    
    // Schema for both personas
    struct User{
        address walletId;
        string id;
        string name;
        string email;
        string mobile;
        string addres;
    }

    // Mapping to store all the users
    mapping (address => User) private users;
    mapping (string => User) private users1;

    // Function to register a user
    // Inputs- User Id, Name, Email, Mobile, Address
    // Outputs- None
    function register(
        string memory _id,
        string memory _name,
        string memory _email,
        string memory _mobile,
        string memory _addres
    ) external{
        require(users[msg.sender].walletId == address(0), "Already registered!");

        users[msg.sender] = User({
            walletId : msg.sender,
            id : _id,
            name : _name,
            email : _email,
            mobile : _mobile,
            addres : _addres
        });

        users1[_id] = User({
            walletId : msg.sender,
            id : _id,
            name : _name,
            email : _email,
            mobile : _mobile,
            addres : _addres
        });
    }

    // Function to get self user details
    // Inputs- None
    // Outputs- User Id, Name, Email, Mobile, Address
    function getSelfDetails()
        external 
        view 
        returns(
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
            User memory currentUser = users[msg.sender];
            require(currentUser.walletId != address(0), "Not a valid wallet Id");
            require(currentUser.walletId == msg.sender, "Not authorized to get all the personal details");

            return (
                currentUser.id,
                currentUser.name,
                currentUser.email,
                currentUser.mobile,
                currentUser.addres
            );
    }

    // Function to get user details
    // Inputs- User Id
    // Outputs- Wallet Id, Name, Email, Mobile, Address
    function getAllDetails(string memory _id)
        external 
        view 
        returns(
            address,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
            bytes memory str = bytes(_id);
            require(str[0]=="A" && str[1]=="G", "Not authorized to get all the personal details");
            User memory currentUser = users1[_id];

            return (
                currentUser.walletId,
                currentUser.name,
                currentUser.email,
                currentUser.mobile,
                currentUser.addres
            );
    }

    // Function to edit the user details
    // Input- User Id, Name, Email, Mobile, Addres
    // Output- None
    function updateDetails(
        string memory _id,
        string memory _name,
        string memory _email,
        string memory _mobile,
        string memory _addres
    ) external {
            User memory currentUser = users[msg.sender];
            require(currentUser.walletId != address(0), "Not a valid wallet Id to update details");
            require(currentUser.walletId == msg.sender, "Not authorized to update the personal details");

            users[msg.sender] = User({
                walletId : msg.sender,
                id : _id,
                name : _name,
                email : _email,
                mobile : _mobile,
                addres : _addres
            });
    }
}