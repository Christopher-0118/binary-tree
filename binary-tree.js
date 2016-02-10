'use strict';

class BinaryTree {
	constructor(node) {
		this.root = node || null;
	}

	insert(data) { 
        var currentRoot = this.root; 
        var insertDone = false;
        
		if (currentRoot !== null) {
			while (insertDone === false) {
				if (data < currentRoot.data) {
					if (currentRoot.left === null) {
						currentRoot.left = new Node(data);
						insertDone = true;
					}
					else {
						currentRoot = currentRoot.left;
					}
				}
				else { 
					if (currentRoot.right === null) {
						currentRoot.right = new Node(data);
						insertDone = true;
					}
					else {
						currentRoot = currentRoot.right;
					}
				}
			} 	
		}
		else {
			this.root = new Node(data);

		}
	}

	contains(data) { 
        var currentRoot = this.root; 
        var searchDone = false;
       
        if (currentRoot === null) { 
            return false;  
        }
        
        while (searchDone === false) {  
            if (currentRoot.data == data) {
                    return true;  
            }

            if (data < currentRoot.data) {
                if (currentRoot.left === null) {
                    return false;
                }
             
                if (currentRoot.data === data) { 
                    return true;
                }
                
                currentRoot = currentRoot.left;  
            }
            else { 
                if (currentRoot.right === null) {
                    return false;
                }
                else {
                    if (currentRoot.data === data) {
                        return true;
                    }
                    
                    currentRoot = currentRoot.right;    
                }
            }
        } 	
                         
    }			

	remove(data) {        
        var currentRoot = this.root; 
        var searchDone = false;
        var childNumber,
             parent = null,
             replacement,
             replacementParent;
       
        searchDone = this.isEmpty(); 
        
        while (!searchDone && currentRoot) {            
            if (data < currentRoot.data) { 
                parent = currentRoot;
                currentRoot = currentRoot.left;                      
            }
            else if (data > currentRoot.data) {
                parent = currentRoot;
                currentRoot = currentRoot.right;
            }            
            else {
                searchDone = true;                                             
            }                
        }
        
        if (searchDone) {
            childNumber = (currentRoot.left !== null ? 1 : 0) + 
                        (currentRoot.right !== null ? 1 : 0);
        }
        if (currentRoot === this.root) {  
            switch (childNumber) {
                
                case 0: 
                    this.root = null;
                    break; 
                    
                case 1: 
                    this.root = (currentRoot.right === null ? currentRoot.left : 
                                                            currentRoot.right);  
                    break;
                    
                case 2: 
                    replacement = this.root.left;
                                        
                    while (replacementParent.right !== null) {
                        replacementParent = replacement;
                        replacement = replacement.right
                    }
                    if (replacementParent !== null) { 
                        replacementParent.right = replacement.left;
                        replacement.right = this.root.right;
                        replacement.left = this.root.left;    
                    }
                    else { 
                        replacement.right = this.root.right;                        
                    }
                    this.root = replacement;
            }
        }
        else {             
            switch (childNumber) {
                
                case 0:
                    if (currentRoot.data < parent.data) {
                        parent.left = null;
                    }                    
                    else {
                        parent.right = null;
                    }
                    break;
                    
                case 1: 
                    if (currentRoot.data < parent.data) {
                        parent.left = (currentRoot.left === null ? 
                                    currentRoot.right : currentRoot.left);
                }                
                    else {
                        parent.right = (currentRoot.left === null ? 
                                        currentRoot.right : currentRoot.left);
                    }
                    break;                    
                    
                case 2: {
                    replacement = this.root.left;
                    replacementParent = currentRoot;
                    
                    while (replacement.right !== null) {
                        replacementParent = replacement;
                        replacement = replacement.right;                            
                    }
                        replacementParent.right = replacement.left;
                        replacement.left = currentRoot.left;
                        replacement.right = currentRoot.right; 
                        
                    if (currentRoot.data < parent) {
                        parent.left = replacement;                               
                    }                    
                    else {
                        parent.right = replacement;
                    }
                }
            }
        }
         	
	}
    
    size() { 
        var currentRoot = this.root;
        
        if (this.isEmpty()) return 0;         
        return this.countLeaves(currentRoot); 
    } 

    countLeaves(node) { 
        if (node === null) { 
            return 0; 
        } 
        
        return 1 + (this.countLeaves(node.left) + this.countLeaves(node.right)); 
    } 
 
    isEmpty() {
        return this.root ? false : true;
    }
}
