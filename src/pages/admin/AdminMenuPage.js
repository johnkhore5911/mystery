// // import React, { useState, useEffect } from 'react';
// // import { 
// //   Plus, 
// //   Edit2, 
// //   Trash2, 
// //   Save, 
// //   X, 
// //   Image as ImageIcon,
// //   Leaf,
// //   Clock
// // } from 'lucide-react';
// // import toast, { Toaster } from 'react-hot-toast';
// // import '../../assets/styles/AdminMenuPage.css';
// // import AdminNavbar from '../../components/AdminNavbar';
// // import { menuAPI } from '../../api/menuAPI';

// // const AdminMenuPage = () => {
// //   const [menuData, setMenuData] = useState(null);
// //   const [showItemModal, setShowItemModal] = useState(false);
// //   const [showCategoryModal, setShowCategoryModal] = useState(false);
// //   const [editingItem, setEditingItem] = useState(null);
// //   const [editingCategory, setEditingCategory] = useState(null);
// //   const [selectedCategory, setSelectedCategory] = useState('all');



// // // Add this function for file upload
// // const handleImageUpload = (e) => {
// //   const file = e.target.files[0];
// //   if (file) {
// //     // Convert to base64 for storage (for demo purposes)
// //     // In production, upload to cloud storage (Cloudinary, S3, etc.)
// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       setItemForm({...itemForm, image: reader.result});
// //       toast.success('Image uploaded!');
// //     };
// //     reader.readAsDataURL(file);
// //   }
// // };


// //   // // Item form state
// //   // const [itemForm, setItemForm] = useState({
// //   //   name: '',
// //   //   description: '',
// //   //   price: '',
// //   //   category: '',
// //   //   image: '',
// //   //   isVeg: true,
// //   //   isPopular: false,
// //   //   prepTime: ''
// //   // });

// //     // Add to state initialization
// // const [itemForm, setItemForm] = useState({
// //   name: '',
// //   description: '',
// //   price: '',
// //   category: '',
// //   image: '',
// //   imageUploadType: 'url', // NEW: 'url' or 'file'
// //   isVeg: true,
// //   isPopular: false,
// //   prepTime: ''
// // });


// //   // Category form state
// //   const [categoryForm, setCategoryForm] = useState({
// //     name: '',
// //     icon: ''
// //   });

// //   useEffect(() => {
// //     loadMenu();
// //   }, []);

// //   const loadMenu = () => {
// //     // Load from localStorage (simulating backend)
// //     const storedMenu = localStorage.getItem('menuData');
// //     if (storedMenu) {
// //       setMenuData(JSON.parse(storedMenu));
// //     } else {
// //       // Initialize with default data
// //       const defaultMenu = {
// //         categories: [
// //           { id: 'appetizers', name: 'Appetizers', icon: '🥟', items: [] },
// //           { id: 'main-course', name: 'Main Course', icon: '🍛', items: [] },
// //           { id: 'desserts', name: 'Desserts', icon: '🍰', items: [] },
// //           { id: 'beverages', name: 'Beverages', icon: '☕', items: [] }
// //         ]
// //       };
// //       setMenuData(defaultMenu);
// //       localStorage.setItem('menuData', JSON.stringify(defaultMenu));
// //     }
// //   };

// //   const saveMenu = (newMenuData) => {
// //     localStorage.setItem('menuData', JSON.stringify(newMenuData));
// //     setMenuData(newMenuData);
// //   };

// //   // Item Operations
// //   const openAddItemModal = (categoryId) => {
// //     setEditingItem(null);
// //     setItemForm({
// //       name: '',
// //       description: '',
// //       price: '',
// //       category: categoryId || menuData.categories[0].id,
// //       image: '',
// //       isVeg: true,
// //       isPopular: false,
// //       prepTime: ''
// //     });
// //     setShowItemModal(true);
// //   };

// //   const openEditItemModal = (item, categoryId) => {
// //     setEditingItem({ ...item, categoryId });
// //     setItemForm({
// //       name: item.name,
// //       description: item.description,
// //       price: item.price,
// //       category: categoryId,
// //       image: item.image,
// //       isVeg: item.isVeg,
// //       isPopular: item.isPopular,
// //       prepTime: item.prepTime
// //     });
// //     setShowItemModal(true);
// //   };

// //   const saveItem = () => {
// //     if (!itemForm.name || !itemForm.price || !itemForm.category) {
// //       toast.error('Please fill required fields');
// //       return;
// //     }

// //     const newItem = {
// //       id: editingItem ? editingItem.id : `item-${Date.now()}`,
// //       ...itemForm,
// //       price: parseFloat(itemForm.price)
// //     };

// //     const updatedMenu = { ...menuData };
// //     const categoryIndex = updatedMenu.categories.findIndex(
// //       cat => cat.id === itemForm.category
// //     );

// //     if (editingItem) {
// //       // Edit existing item
// //       const oldCategoryIndex = updatedMenu.categories.findIndex(
// //         cat => cat.id === editingItem.categoryId
// //       );
      
// //       // Remove from old category
// //       updatedMenu.categories[oldCategoryIndex].items = 
// //         updatedMenu.categories[oldCategoryIndex].items.filter(
// //           item => item.id !== editingItem.id
// //         );
      
// //       // Add to new category
// //       if (!updatedMenu.categories[categoryIndex].items) {
// //         updatedMenu.categories[categoryIndex].items = [];
// //       }
// //       updatedMenu.categories[categoryIndex].items.push(newItem);
// //       toast.success('Item updated successfully!');
// //     } else {
// //       // Add new item
// //       if (!updatedMenu.categories[categoryIndex].items) {
// //         updatedMenu.categories[categoryIndex].items = [];
// //       }
// //       updatedMenu.categories[categoryIndex].items.push(newItem);
// //       toast.success('Item added successfully!');
// //     }

// //     saveMenu(updatedMenu);
// //     setShowItemModal(false);
// //   };

// //   const deleteItem = (itemId, categoryId) => {
// //     if (!window.confirm('Are you sure you want to delete this item?')) return;

// //     const updatedMenu = { ...menuData };
// //     const categoryIndex = updatedMenu.categories.findIndex(
// //       cat => cat.id === categoryId
// //     );
    
// //     updatedMenu.categories[categoryIndex].items = 
// //       updatedMenu.categories[categoryIndex].items.filter(
// //         item => item.id !== itemId
// //       );

// //     saveMenu(updatedMenu);
// //     toast.success('Item deleted');
// //   };

// //   // Category Operations
// //   const openAddCategoryModal = () => {
// //     setEditingCategory(null);
// //     setCategoryForm({ name: '', icon: '' });
// //     setShowCategoryModal(true);
// //   };

// //   const openEditCategoryModal = (category) => {
// //     setEditingCategory(category);
// //     setCategoryForm({ name: category.name, icon: category.icon });
// //     setShowCategoryModal(true);
// //   };

// //   const saveCategory = () => {
// //     if (!categoryForm.name || !categoryForm.icon) {
// //       toast.error('Please fill all fields');
// //       return;
// //     }

// //     const updatedMenu = { ...menuData };
    
// //     if (editingCategory) {
// //       // Edit existing category
// //       const categoryIndex = updatedMenu.categories.findIndex(
// //         cat => cat.id === editingCategory.id
// //       );
// //       updatedMenu.categories[categoryIndex] = {
// //         ...updatedMenu.categories[categoryIndex],
// //         name: categoryForm.name,
// //         icon: categoryForm.icon
// //       };
// //       toast.success('Category updated!');
// //     } else {
// //       // Add new category
// //       const newCategory = {
// //         id: `cat-${Date.now()}`,
// //         name: categoryForm.name,
// //         icon: categoryForm.icon,
// //         items: []
// //       };
// //       updatedMenu.categories.push(newCategory);
// //       toast.success('Category added!');
// //     }

// //     saveMenu(updatedMenu);
// //     setShowCategoryModal(false);
// //   };

// //   const deleteCategory = (categoryId) => {
// //     const category = menuData.categories.find(cat => cat.id === categoryId);
// //     if (category.items && category.items.length > 0) {
// //       toast.error('Cannot delete category with items. Remove items first.');
// //       return;
// //     }

// //     if (!window.confirm('Are you sure you want to delete this category?')) return;

// //     const updatedMenu = {
// //       ...menuData,
// //       categories: menuData.categories.filter(cat => cat.id !== categoryId)
// //     };

// //     saveMenu(updatedMenu);
// //     toast.success('Category deleted');
// //   };

// //   if (!menuData) {
// //     return <div className="loading">Loading menu...</div>;
// //   }

// //   const filteredCategories = selectedCategory === 'all' 
// //     ? menuData.categories 
// //     : menuData.categories.filter(cat => cat.id === selectedCategory);

// //   return (
// //     <>
// //       <AdminNavbar />
// //       <div className="admin-menu-page">
// //       <Toaster position="top-right" />

// //       {/* Header */}
// //       <header className="menu-header">
// //         <div className="header-content">
// //           <div>
// //             <h1>Menu Management</h1>
// //             <p className="header-subtitle">Manage your restaurant menu items and categories</p>
// //           </div>
// //           <div className="header-actions">
// //             <button className="btn btn--secondary" onClick={openAddCategoryModal}>
// //               <Plus size={18} />
// //               Add Category
// //             </button>
// //             <button className="btn btn--primary" onClick={() => openAddItemModal()}>
// //               <Plus size={18} />
// //               Add Menu Item
// //             </button>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Category Filter */}
// //       <div className="category-filter">
// //         <button
// //           className={`filter-chip ${selectedCategory === 'all' ? 'active' : ''}`}
// //           onClick={() => setSelectedCategory('all')}
// //         >
// //           All Categories
// //         </button>
// //         {menuData.categories.map(category => (
// //           <button
// //             key={category.id}
// //             className={`filter-chip ${selectedCategory === category.id ? 'active' : ''}`}
// //             onClick={() => setSelectedCategory(category.id)}
// //           >
// //             <span>{category.icon}</span>
// //             {category.name}
// //           </button>
// //         ))}
// //       </div>

// //       {/* Menu Categories */}
// //       <div className="menu-container">
// //         {filteredCategories.map(category => (
// //           <div key={category.id} className="category-section">
// //             <div className="category-header">
// //               <div className="category-title">
// //                 <span className="category-icon">{category.icon}</span>
// //                 <h2>{category.name}</h2>
// //                 <span className="item-count">
// //                   {category.items?.length || 0} items
// //                 </span>
// //               </div>
// //               <div className="category-actions">
// //                 <button
// //                   className="btn-icon"
// //                   onClick={() => openAddItemModal(category.id)}
// //                   title="Add item to this category"
// //                 >
// //                   <Plus size={18} />
// //                 </button>
// //                 <button
// //                   className="btn-icon"
// //                   onClick={() => openEditCategoryModal(category)}
// //                   title="Edit category"
// //                 >
// //                   <Edit2 size={18} />
// //                 </button>
// //                 <button
// //                   className="btn-icon btn-danger"
// //                   onClick={() => deleteCategory(category.id)}
// //                   title="Delete category"
// //                 >
// //                   <Trash2 size={18} />
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Items Grid */}
// //             <div className="items-grid">
// //               {(!category.items || category.items.length === 0) ? (
// //                 <div className="empty-category">
// //                   <p>No items in this category</p>
// //                   <button 
// //                     className="btn btn--sm btn--primary"
// //                     onClick={() => openAddItemModal(category.id)}
// //                   >
// //                     Add First Item
// //                   </button>
// //                 </div>
// //               ) : (
// //                 category.items.map(item => (
// //                   <div key={item.id} className="menu-item-card">
// //                     <div className="item-image">
// //                       {item.image ? (
// //                         <img src={item.image} alt={item.name} />
// //                       ) : (
// //                         <div className="no-image">
// //                           <ImageIcon size={32} />
// //                         </div>
// //                       )}
// //                       {item.isVeg && (
// //                         <div className="veg-badge">
// //                           <Leaf size={12} />
// //                         </div>
// //                       )}
// //                       {item.isPopular && (
// //                         <div className="popular-badge">★</div>
// //                       )}
// //                     </div>
                    
// //                     <div className="item-details">
// //                       <h3>{item.name}</h3>
// //                       <p className="item-description">{item.description}</p>
// //                       <div className="item-meta">
// //                         <span className="item-price">₹{item.price}</span>
// //                         {item.prepTime && (
// //                           <span className="item-time">
// //                             <Clock size={12} />
// //                             {item.prepTime}
// //                           </span>
// //                         )}
// //                       </div>
// //                     </div>
                    
// //                     <div className="item-actions">
// //                       <button
// //                         className="btn-icon-sm"
// //                         onClick={() => openEditItemModal(item, category.id)}
// //                       >
// //                         <Edit2 size={16} />
// //                       </button>
// //                       <button
// //                         className="btn-icon-sm btn-danger"
// //                         onClick={() => deleteItem(item.id, category.id)}
// //                       >
// //                         <Trash2 size={16} />
// //                       </button>
// //                     </div>
// //                   </div>
// //                 ))
// //               )}
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Item Modal */}
// //       {showItemModal && (
// //         <div className="modal-overlay" onClick={() => setShowItemModal(false)}>
// //           <div className="modal" onClick={(e) => e.stopPropagation()}>
// //             <div className="modal-header">
// //               <h2>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
// //               <button className="btn-icon" onClick={() => setShowItemModal(false)}>
// //                 <X size={20} />
// //               </button>
// //             </div>
            
// //             <div className="modal-body">
// //               <div className="form-group">
// //                 <label>Item Name *</label>
// //                 <input
// //                   type="text"
// //                   className="form-control"
// //                   value={itemForm.name}
// //                   onChange={(e) => setItemForm({...itemForm, name: e.target.value})}
// //                   placeholder="e.g., Butter Chicken"
// //                 />
// //               </div>

// //               <div className="form-group">
// //                 <label>Description</label>
// //                 <textarea
// //                   className="form-control"
// //                   value={itemForm.description}
// //                   onChange={(e) => setItemForm({...itemForm, description: e.target.value})}
// //                   placeholder="Describe the dish..."
// //                   rows="3"
// //                 />
// //               </div>

// //               <div className="form-row">
// //                 <div className="form-group">
// //                   <label>Category *</label>
// //                   <select
// //                     className="form-control"
// //                     value={itemForm.category}
// //                     onChange={(e) => setItemForm({...itemForm, category: e.target.value})}
// //                   >
// //                     {menuData.categories.map(cat => (
// //                       <option key={cat.id} value={cat.id}>
// //                         {cat.icon} {cat.name}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>

// //                 <div className="form-group">
// //                   <label>Price (₹) *</label>
// //                   <input
// //                     type="number"
// //                     className="form-control"
// //                     value={itemForm.price}
// //                     onChange={(e) => setItemForm({...itemForm, price: e.target.value})}
// //                     placeholder="299"
// //                   />
// //                 </div>

// //                 <div className="form-group">
// //                   <label>Prep Time</label>
// //                   <input
// //                     type="text"
// //                     className="form-control"
// //                     value={itemForm.prepTime}
// //                     onChange={(e) => setItemForm({...itemForm, prepTime: e.target.value})}
// //                     placeholder="15 mins"
// //                   />
// //                 </div>
// //               </div>

// //               <div className="form-group">
// //                 <label>Image URL</label>
// //                 <input
// //                   type="text"
// //                   className="form-control"
// //                   value={itemForm.image}
// //                   onChange={(e) => setItemForm({...itemForm, image: e.target.value})}
// //                   placeholder="https://example.com/image.jpg"
// //                 />
// //               </div>

// //               <div className="form-row">
// //                 <div className="form-checkbox">
// //                   <input
// //                     type="checkbox"
// //                     id="isVeg"
// //                     checked={itemForm.isVeg}
// //                     onChange={(e) => setItemForm({...itemForm, isVeg: e.target.checked})}
// //                   />
// //                   <label htmlFor="isVeg">
// //                     <Leaf size={14} />
// //                     Vegetarian
// //                   </label>
// //                 </div>

// //                 <div className="form-checkbox">
// //                   <input
// //                     type="checkbox"
// //                     id="isPopular"
// //                     checked={itemForm.isPopular}
// //                     onChange={(e) => setItemForm({...itemForm, isPopular: e.target.checked})}
// //                   />
// //                   <label htmlFor="isPopular">
// //                     ★ Mark as Popular
// //                   </label>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="modal-footer">
// //               <button className="btn btn--secondary" onClick={() => setShowItemModal(false)}>
// //                 Cancel
// //               </button>
// //               <button className="btn btn--primary" onClick={saveItem}>
// //                 <Save size={18} />
// //                 {editingItem ? 'Update Item' : 'Add Item'}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Category Modal */}
// //       {showCategoryModal && (
// //         <div className="modal-overlay" onClick={() => setShowCategoryModal(false)}>
// //           <div className="modal modal-sm" onClick={(e) => e.stopPropagation()}>
// //             <div className="modal-header">
// //               <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
// //               <button className="btn-icon" onClick={() => setShowCategoryModal(false)}>
// //                 <X size={20} />
// //               </button>
// //             </div>
            
// //             <div className="modal-body">
// //               <div className="form-group">
// //                 <label>Category Name *</label>
// //                 <input
// //                   type="text"
// //                   className="form-control"
// //                   value={categoryForm.name}
// //                   onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
// //                   placeholder="e.g., Appetizers"
// //                 />
// //               </div>

// //               <div className="form-group">
// //                 <label>Emoji Icon *</label>
// //                 <input
// //                   type="text"
// //                   className="form-control"
// //                   value={categoryForm.icon}
// //                   onChange={(e) => setCategoryForm({...categoryForm, icon: e.target.value})}
// //                   placeholder="e.g., 🥟"
// //                 />
// //                 <small>Use any emoji (Windows: Win + . | Mac: Cmd + Ctrl + Space)</small>
// //               </div>
// //             </div>

// //             <div className="modal-footer">
// //               <button className="btn btn--secondary" onClick={() => setShowCategoryModal(false)}>
// //                 Cancel
// //               </button>
// //               <button className="btn btn--primary" onClick={saveCategory}>
// //                 <Save size={18} />
// //                 {editingCategory ? 'Update' : 'Add'} Category
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //     </>
// //   );
// // };

// // export default AdminMenuPage;


// import React, { useState, useEffect } from 'react';
// import { 
//   Plus, 
//   Edit2, 
//   Trash2, 
//   Save, 
//   X, 
//   Image as ImageIcon,
//   Leaf,
//   Clock
// } from 'lucide-react';
// import toast, { Toaster } from 'react-hot-toast';
// import '../../assets/styles/AdminMenuPage.css';
// import AdminNavbar from '../../components/AdminNavbar';
// import { menuAPI } from '../../api/menuAPI';

// const AdminMenuPage = () => {
//   const [menuData, setMenuData] = useState(null);
//   const [showItemModal, setShowItemModal] = useState(false);
//   const [showCategoryModal, setShowCategoryModal] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState('all');



// // Add this function for file upload
// const handleImageUpload = (e) => {
//   const file = e.target.files[0];
//   if (file) {
//     // Convert to base64 for storage (for demo purposes)
//     // In production, upload to cloud storage (Cloudinary, S3, etc.)
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setItemForm({...itemForm, image: reader.result});
//       toast.success('Image uploaded!');
//     };
//     reader.readAsDataURL(file);
//   }
// };


//   // // Item form state
//   // const [itemForm, setItemForm] = useState({
//   //   name: '',
//   //   description: '',
//   //   price: '',
//   //   category: '',
//   //   image: '',
//   //   isVeg: true,
//   //   isPopular: false,
//   //   prepTime: ''
//   // });

//     // Add to state initialization
// const [itemForm, setItemForm] = useState({
//   name: '',
//   description: '',
//   price: '',
//   category: '',
//   image: '',
//   imageUploadType: 'url', // NEW: 'url' or 'file'
//   isVeg: true,
//   isPopular: false,
//   prepTime: ''
// });


//   // Category form state
//   const [categoryForm, setCategoryForm] = useState({
//     name: '',
//     icon: ''
//   });

//   useEffect(() => {
//     loadMenu();
//   }, []);

//   const loadMenu = () => {
//     // Load from localStorage (simulating backend)
//     const storedMenu = localStorage.getItem('menuData');
//     if (storedMenu) {
//       setMenuData(JSON.parse(storedMenu));
//     } else {
//       // Initialize with default data
//       const defaultMenu = {
//         categories: [
//           { id: 'appetizers', name: 'Appetizers', icon: '🥟', items: [] },
//           { id: 'main-course', name: 'Main Course', icon: '🍛', items: [] },
//           { id: 'desserts', name: 'Desserts', icon: '🍰', items: [] },
//           { id: 'beverages', name: 'Beverages', icon: '☕', items: [] }
//         ]
//       };
//       setMenuData(defaultMenu);
//       localStorage.setItem('menuData', JSON.stringify(defaultMenu));
//     }
//   };

//   const saveMenu = (newMenuData) => {
//     localStorage.setItem('menuData', JSON.stringify(newMenuData));
//     setMenuData(newMenuData);
//   };

//   // Item Operations
//   const openAddItemModal = (categoryId) => {
//     setEditingItem(null);
//     setItemForm({
//       name: '',
//       description: '',
//       price: '',
//       category: categoryId || menuData.categories[0].id,
//       image: '',
//       isVeg: true,
//       isPopular: false,
//       prepTime: ''
//     });
//     setShowItemModal(true);
//   };

//   const openEditItemModal = (item, categoryId) => {
//     setEditingItem({ ...item, categoryId });
//     setItemForm({
//       name: item.name,
//       description: item.description,
//       price: item.price,
//       category: categoryId,
//       image: item.image,
//       isVeg: item.isVeg,
//       isPopular: item.isPopular,
//       prepTime: item.prepTime
//     });
//     setShowItemModal(true);
//   };

//   const saveItem = () => {
//     if (!itemForm.name || !itemForm.price || !itemForm.category) {
//       toast.error('Please fill required fields');
//       return;
//     }

//     const newItem = {
//       id: editingItem ? editingItem.id : `item-${Date.now()}`,
//       ...itemForm,
//       price: parseFloat(itemForm.price)
//     };

//     const updatedMenu = { ...menuData };
//     const categoryIndex = updatedMenu.categories.findIndex(
//       cat => cat.id === itemForm.category
//     );

//     if (editingItem) {
//       // Edit existing item
//       const oldCategoryIndex = updatedMenu.categories.findIndex(
//         cat => cat.id === editingItem.categoryId
//       );
      
//       // Remove from old category
//       updatedMenu.categories[oldCategoryIndex].items = 
//         updatedMenu.categories[oldCategoryIndex].items.filter(
//           item => item.id !== editingItem.id
//         );
      
//       // Add to new category
//       if (!updatedMenu.categories[categoryIndex].items) {
//         updatedMenu.categories[categoryIndex].items = [];
//       }
//       updatedMenu.categories[categoryIndex].items.push(newItem);
//       toast.success('Item updated successfully!');
//     } else {
//       // Add new item
//       if (!updatedMenu.categories[categoryIndex].items) {
//         updatedMenu.categories[categoryIndex].items = [];
//       }
//       updatedMenu.categories[categoryIndex].items.push(newItem);
//       toast.success('Item added successfully!');
//     }

//     saveMenu(updatedMenu);
//     setShowItemModal(false);
//   };

//   const deleteItem = (itemId, categoryId) => {
//     if (!window.confirm('Are you sure you want to delete this item?')) return;

//     const updatedMenu = { ...menuData };
//     const categoryIndex = updatedMenu.categories.findIndex(
//       cat => cat.id === categoryId
//     );
    
//     updatedMenu.categories[categoryIndex].items = 
//       updatedMenu.categories[categoryIndex].items.filter(
//         item => item.id !== itemId
//       );

//     saveMenu(updatedMenu);
//     toast.success('Item deleted');
//   };

//   // Category Operations
//   const openAddCategoryModal = () => {
//     setEditingCategory(null);
//     setCategoryForm({ name: '', icon: '' });
//     setShowCategoryModal(true);
//   };

//   const openEditCategoryModal = (category) => {
//     setEditingCategory(category);
//     setCategoryForm({ name: category.name, icon: category.icon });
//     setShowCategoryModal(true);
//   };

//   const saveCategory = () => {
//     if (!categoryForm.name || !categoryForm.icon) {
//       toast.error('Please fill all fields');
//       return;
//     }

//     const updatedMenu = { ...menuData };
    
//     if (editingCategory) {
//       // Edit existing category
//       const categoryIndex = updatedMenu.categories.findIndex(
//         cat => cat.id === editingCategory.id
//       );
//       updatedMenu.categories[categoryIndex] = {
//         ...updatedMenu.categories[categoryIndex],
//         name: categoryForm.name,
//         icon: categoryForm.icon
//       };
//       toast.success('Category updated!');
//     } else {
//       // Add new category
//       const newCategory = {
//         id: `cat-${Date.now()}`,
//         name: categoryForm.name,
//         icon: categoryForm.icon,
//         items: []
//       };
//       updatedMenu.categories.push(newCategory);
//       toast.success('Category added!');
//     }

//     saveMenu(updatedMenu);
//     setShowCategoryModal(false);
//   };

//   const deleteCategory = (categoryId) => {
//     const category = menuData.categories.find(cat => cat.id === categoryId);
//     if (category.items && category.items.length > 0) {
//       toast.error('Cannot delete category with items. Remove items first.');
//       return;
//     }

//     if (!window.confirm('Are you sure you want to delete this category?')) return;

//     const updatedMenu = {
//       ...menuData,
//       categories: menuData.categories.filter(cat => cat.id !== categoryId)
//     };

//     saveMenu(updatedMenu);
//     toast.success('Category deleted');
//   };

//   if (!menuData) {
//     return <div className="loading">Loading menu...</div>;
//   }

//   const filteredCategories = selectedCategory === 'all' 
//     ? menuData.categories 
//     : menuData.categories.filter(cat => cat.id === selectedCategory);

//   return (
//     <>
//       <AdminNavbar />
//       <div className="admin-menu-page">
//       <Toaster position="top-right" />

//       {/* Header */}
//       <header className="menu-header">
//         <div className="header-content">
//           <div>
//             <h1>Menu Management</h1>
//             <p className="header-subtitle">Manage your restaurant menu items and categories</p>
//           </div>
//           <div className="header-actions">
//             <button className="btn btn--secondary" onClick={openAddCategoryModal}>
//               <Plus size={18} />
//               Add Category
//             </button>
//             <button className="btn btn--primary" onClick={() => openAddItemModal()}>
//               <Plus size={18} />
//               Add Menu Item
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Category Filter */}
//       <div className="category-filter">
//         <button
//           className={`filter-chip ${selectedCategory === 'all' ? 'active' : ''}`}
//           onClick={() => setSelectedCategory('all')}
//         >
//           All Categories
//         </button>
//         {menuData.categories.map(category => (
//           <button
//             key={category.id}
//             className={`filter-chip ${selectedCategory === category.id ? 'active' : ''}`}
//             onClick={() => setSelectedCategory(category.id)}
//           >
//             <span>{category.icon}</span>
//             {category.name}
//           </button>
//         ))}
//       </div>

//       {/* Menu Categories */}
//       <div className="menu-container">
//         {filteredCategories.map(category => (
//           <div key={category.id} className="category-section">
//             <div className="category-header">
//               <div className="category-title">
//                 <span className="category-icon">{category.icon}</span>
//                 <h2>{category.name}</h2>
//                 <span className="item-count">
//                   {category.items?.length || 0} items
//                 </span>
//               </div>
//               <div className="category-actions">
//                 <button
//                   className="btn-icon"
//                   onClick={() => openAddItemModal(category.id)}
//                   title="Add item to this category"
//                 >
//                   <Plus size={18} />
//                 </button>
//                 <button
//                   className="btn-icon"
//                   onClick={() => openEditCategoryModal(category)}
//                   title="Edit category"
//                 >
//                   <Edit2 size={18} />
//                 </button>
//                 <button
//                   className="btn-icon btn-danger"
//                   onClick={() => deleteCategory(category.id)}
//                   title="Delete category"
//                 >
//                   <Trash2 size={18} />
//                 </button>
//               </div>
//             </div>

//             {/* Items Grid */}
//             <div className="items-grid">
//               {(!category.items || category.items.length === 0) ? (
//                 <div className="empty-category">
//                   <p>No items in this category</p>
//                   <button 
//                     className="btn btn--sm btn--primary"
//                     onClick={() => openAddItemModal(category.id)}
//                   >
//                     Add First Item
//                   </button>
//                 </div>
//               ) : (
//                 category.items.map(item => (
//                   <div key={item.id} className="menu-item-card">
//                     <div className="item-image">
//                       {item.image ? (
//                         <img src={item.image} alt={item.name} />
//                       ) : (
//                         <div className="no-image">
//                           <ImageIcon size={32} />
//                         </div>
//                       )}
//                       {item.isVeg && (
//                         <div className="veg-badge">
//                           <Leaf size={12} />
//                         </div>
//                       )}
//                       {item.isPopular && (
//                         <div className="popular-badge">★</div>
//                       )}
//                     </div>
                    
//                     <div className="item-details">
//                       <h3>{item.name}</h3>
//                       <p className="item-description">{item.description}</p>
//                       <div className="item-meta">
//                         <span className="item-price">₹{item.price}</span>
//                         {item.prepTime && (
//                           <span className="item-time">
//                             <Clock size={12} />
//                             {item.prepTime}
//                           </span>
//                         )}
//                       </div>
//                     </div>
                    
//                     <div className="item-actions">
//                       <button
//                         className="btn-icon-sm"
//                         onClick={() => openEditItemModal(item, category.id)}
//                       >
//                         <Edit2 size={16} />
//                       </button>
//                       <button
//                         className="btn-icon-sm btn-danger"
//                         onClick={() => deleteItem(item.id, category.id)}
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Item Modal */}
//       {showItemModal && (
//         <div className="modal-overlay" onClick={() => setShowItemModal(false)}>
//           <div className="modal" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
//               <button className="btn-icon" onClick={() => setShowItemModal(false)}>
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="modal-body">
//               <div className="form-group">
//                 <label>Item Name *</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={itemForm.name}
//                   onChange={(e) => setItemForm({...itemForm, name: e.target.value})}
//                   placeholder="e.g., Butter Chicken"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Description</label>
//                 <textarea
//                   className="form-control"
//                   value={itemForm.description}
//                   onChange={(e) => setItemForm({...itemForm, description: e.target.value})}
//                   placeholder="Describe the dish..."
//                   rows="3"
//                 />
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Category *</label>
//                   <select
//                     className="form-control"
//                     value={itemForm.category}
//                     onChange={(e) => setItemForm({...itemForm, category: e.target.value})}
//                   >
//                     {menuData.categories.map(cat => (
//                       <option key={cat.id} value={cat.id}>
//                         {cat.icon} {cat.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label>Price (₹) *</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={itemForm.price}
//                     onChange={(e) => setItemForm({...itemForm, price: e.target.value})}
//                     placeholder="299"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Prep Time</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={itemForm.prepTime}
//                     onChange={(e) => setItemForm({...itemForm, prepTime: e.target.value})}
//                     placeholder="15 mins"
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label>Image URL</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={itemForm.image}
//                   onChange={(e) => setItemForm({...itemForm, image: e.target.value})}
//                   placeholder="https://example.com/image.jpg"
//                 />
//               </div>

//               <div className="form-row">
//                 <div className="form-checkbox">
//                   <input
//                     type="checkbox"
//                     id="isVeg"
//                     checked={itemForm.isVeg}
//                     onChange={(e) => setItemForm({...itemForm, isVeg: e.target.checked})}
//                   />
//                   <label htmlFor="isVeg">
//                     <Leaf size={14} />
//                     Vegetarian
//                   </label>
//                 </div>

//                 <div className="form-checkbox">
//                   <input
//                     type="checkbox"
//                     id="isPopular"
//                     checked={itemForm.isPopular}
//                     onChange={(e) => setItemForm({...itemForm, isPopular: e.target.checked})}
//                   />
//                   <label htmlFor="isPopular">
//                     ★ Mark as Popular
//                   </label>
//                 </div>
//               </div>
//             </div>

//             <div className="modal-footer">
//               <button className="btn btn--secondary" onClick={() => setShowItemModal(false)}>
//                 Cancel
//               </button>
//               <button className="btn btn--primary" onClick={saveItem}>
//                 <Save size={18} />
//                 {editingItem ? 'Update Item' : 'Add Item'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Category Modal */}
//       {showCategoryModal && (
//         <div className="modal-overlay" onClick={() => setShowCategoryModal(false)}>
//           <div className="modal modal-sm" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
//               <button className="btn-icon" onClick={() => setShowCategoryModal(false)}>
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="modal-body">
//               <div className="form-group">
//                 <label>Category Name *</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={categoryForm.name}
//                   onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
//                   placeholder="e.g., Appetizers"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Emoji Icon *</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={categoryForm.icon}
//                   onChange={(e) => setCategoryForm({...categoryForm, icon: e.target.value})}
//                   placeholder="e.g., 🥟"
//                 />
//                 <small>Use any emoji (Windows: Win + . | Mac: Cmd + Ctrl + Space)</small>
//               </div>
//             </div>

//             <div className="modal-footer">
//               <button className="btn btn--secondary" onClick={() => setShowCategoryModal(false)}>
//                 Cancel
//               </button>
//               <button className="btn btn--primary" onClick={saveCategory}>
//                 <Save size={18} />
//                 {editingCategory ? 'Update' : 'Add'} Category
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// export default AdminMenuPage;


import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Image as ImageIcon,
  Leaf,
  Clock
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import '../../assets/styles/AdminMenuPage.css';
import AdminNavbar from '../../components/AdminNavbar';
import { menuAPI } from '../../api/menuAPI'; // ✅ Import API

const AdminMenuPage = () => {
  const [menuData, setMenuData] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Add this function for file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setItemForm({...itemForm, image: reader.result});
        toast.success('Image uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Item form state
  const [itemForm, setItemForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    imageUploadType: 'url',
    isVeg: true,
    isPopular: false,
    prepTime: ''
  });

  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    icon: ''
  });

  useEffect(() => {
    loadMenu();
  }, []);

  // ✅ CHANGED: Load from DATABASE instead of localStorage
  const loadMenu = async () => {
    try {
      const response = await menuAPI.getAllCategories();
      
      if (response.success && response.categories && response.categories.length > 0) {
        // ✅ Transform database response to match your UI format
        const transformedData = {
          categories: response.categories.map(cat => ({
            id: cat._id || cat.id,
            name: cat.name,
            icon: cat.icon,
            items: (cat.items || []).map(item => ({
              id: item._id || item.id,
              name: item.name,
              description: item.description,
              price: item.price,
              image: item.image,
              isVeg: item.isVeg,
              isPopular: item.isPopular,
              prepTime: item.prepTime
            }))
          }))
        };
        setMenuData(transformedData);
      } else {
        // ✅ Initialize with default data and save to database
        const defaultMenu = {
          categories: [
            { id: 'appetizers', name: 'Appetizers', icon: '🥟', items: [] },
            { id: 'main-course', name: 'Main Course', icon: '🍛', items: [] },
            { id: 'desserts', name: 'Desserts', icon: '🍰', items: [] },
            { id: 'beverages', name: 'Beverages', icon: '☕', items: [] }
          ]
        };
        
        // ✅ Create default categories in database
        try {
          for (let i = 0; i < defaultMenu.categories.length; i++) {
            const cat = defaultMenu.categories[i];
            await menuAPI.createCategory({ name: cat.name, icon: cat.icon, order: i });
          }
          // Reload after creating
          setTimeout(() => loadMenu(), 500);
        } catch (err) {
          // If creation fails, just use local data
          setMenuData(defaultMenu);
        }
      }
    } catch (error) {
      console.error('Load menu error:', error);
      // ✅ Fallback: Use default data if API fails
      const defaultMenu = {
        categories: [
          { id: 'appetizers', name: 'Appetizers', icon: '🥟', items: [] },
          { id: 'main-course', name: 'Main Course', icon: '🍛', items: [] },
          { id: 'desserts', name: 'Desserts', icon: '🍰', items: [] },
          { id: 'beverages', name: 'Beverages', icon: '☕', items: [] }
        ]
      };
      setMenuData(defaultMenu);
    }
  };

  // ✅ REMOVED: saveMenu function (now we use API calls directly)

  // Item Operations
  const openAddItemModal = (categoryId) => {
    setEditingItem(null);
    setItemForm({
      name: '',
      description: '',
      price: '',
      category: categoryId || menuData.categories[0].id,
      image: '',
      isVeg: true,
      isPopular: false,
      prepTime: ''
    });
    setShowItemModal(true);
  };

  const openEditItemModal = (item, categoryId) => {
    setEditingItem({ ...item, categoryId });
    setItemForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: categoryId,
      image: item.image,
      isVeg: item.isVeg,
      isPopular: item.isPopular,
      prepTime: item.prepTime
    });
    setShowItemModal(true);
  };

  // ✅ CHANGED: Save item to DATABASE
  const saveItem = async () => {
    if (!itemForm.name || !itemForm.price || !itemForm.category) {
      toast.error('Please fill required fields');
      return;
    }

    const itemData = {
      name: itemForm.name,
      description: itemForm.description,
      price: parseFloat(itemForm.price),
      category: itemForm.category,
      image: itemForm.image,
      isVeg: itemForm.isVeg,
      isPopular: itemForm.isPopular,
      prepTime: itemForm.prepTime
    };

    try {
      if (editingItem) {
        // ✅ UPDATE existing item in database
        await menuAPI.updateMenuItem(editingItem.id, itemData);
        toast.success('Item updated successfully!');
      } else {
        // ✅ CREATE new item in database
        await menuAPI.createMenuItem(itemData);
        toast.success('Item added successfully!');
      }

      setShowItemModal(false);
      loadMenu(); // ✅ Reload from database
    } catch (error) {
      console.error('Save item error:', error);
      toast.error('Failed to save item');
    }
  };

  // ✅ CHANGED: Delete item from DATABASE
  const deleteItem = async (itemId, categoryId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await menuAPI.deleteMenuItem(itemId);
      toast.success('Item deleted');
      loadMenu(); // ✅ Reload from database
    } catch (error) {
      console.error('Delete item error:', error);
      toast.error('Failed to delete item');
    }
  };

  // Category Operations
  const openAddCategoryModal = () => {
    setEditingCategory(null);
    setCategoryForm({ name: '', icon: '' });
    setShowCategoryModal(true);
  };

  const openEditCategoryModal = (category) => {
    setEditingCategory(category);
    setCategoryForm({ name: category.name, icon: category.icon });
    setShowCategoryModal(true);
  };

  // ✅ CHANGED: Save category to DATABASE
  const saveCategory = async () => {
    if (!categoryForm.name || !categoryForm.icon) {
      toast.error('Please fill all fields');
      return;
    }

    const categoryData = {
      name: categoryForm.name,
      icon: categoryForm.icon,
      order: menuData.categories.length
    };

    try {
      if (editingCategory) {
        // ✅ UPDATE existing category in database
        await menuAPI.updateCategory(editingCategory.id, categoryData);
        toast.success('Category updated!');
      } else {
        // ✅ CREATE new category in database
        await menuAPI.createCategory(categoryData);
        toast.success('Category added!');
      }

      setShowCategoryModal(false);
      loadMenu(); // ✅ Reload from database
    } catch (error) {
      console.error('Save category error:', error);
      toast.error('Failed to save category');
    }
  };

  // ✅ CHANGED: Delete category from DATABASE
  const deleteCategory = async (categoryId) => {
    const category = menuData.categories.find(cat => cat.id === categoryId);
    if (category.items && category.items.length > 0) {
      toast.error('Cannot delete category with items. Remove items first.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await menuAPI.deleteCategory(categoryId);
      toast.success('Category deleted');
      loadMenu(); // ✅ Reload from database
    } catch (error) {
      console.error('Delete category error:', error);
      toast.error('Failed to delete category');
    }
  };

  if (!menuData) {
    return <div className="loading">Loading menu...</div>;
  }

  const filteredCategories = selectedCategory === 'all' 
    ? menuData.categories 
    : menuData.categories.filter(cat => cat.id === selectedCategory);

  return (
    <>
      <AdminNavbar />
      <div className="admin-menu-page">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="menu-header">
        <div className="header-content">
          <div>
            <h1>Menu Management</h1>
            <p className="header-subtitle">Manage your restaurant menu items and categories</p>
          </div>
          <div className="header-actions">
            <button className="btn btn--secondary" onClick={openAddCategoryModal}>
              <Plus size={18} />
              Add Category
            </button>
            <button className="btn btn--primary" onClick={() => openAddItemModal()}>
              <Plus size={18} />
              Add Menu Item
            </button>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="category-filter">
        <button
          className={`filter-chip ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          All Categories
        </button>
        {menuData.categories.map(category => (
          <button
            key={category.id}
            className={`filter-chip ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span>{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Menu Categories */}
      <div className="menu-container">
        {filteredCategories.map(category => (
          <div key={category.id} className="category-section">
            <div className="category-header">
              <div className="category-title">
                <span className="category-icon">{category.icon}</span>
                <h2>{category.name}</h2>
                <span className="item-count">
                  {category.items?.length || 0} items
                </span>
              </div>
              <div className="category-actions">
                <button
                  className="btn-icon"
                  onClick={() => openAddItemModal(category.id)}
                  title="Add item to this category"
                >
                  <Plus size={18} />
                </button>
                <button
                  className="btn-icon"
                  onClick={() => openEditCategoryModal(category)}
                  title="Edit category"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  className="btn-icon btn-danger"
                  onClick={() => deleteCategory(category.id)}
                  title="Delete category"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Items Grid */}
            <div className="items-grid">
              {(!category.items || category.items.length === 0) ? (
                <div className="empty-category">
                  <p>No items in this category</p>
                  <button 
                    className="btn btn--sm btn--primary"
                    onClick={() => openAddItemModal(category.id)}
                  >
                    Add First Item
                  </button>
                </div>
              ) : (
                category.items.map(item => (
                  <div key={item.id} className="menu-item-card">
                    <div className="item-image">
                      {item.image ? (
                        <img src={item.image} alt={item.name} />
                      ) : (
                        <div className="no-image">
                          <ImageIcon size={32} />
                        </div>
                      )}
                      {item.isVeg && (
                        <div className="veg-badge">
                          <Leaf size={12} />
                        </div>
                      )}
                      {item.isPopular && (
                        <div className="popular-badge">★</div>
                      )}
                    </div>
                    
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-description">{item.description}</p>
                      <div className="item-meta">
                        <span className="item-price">₹{item.price}</span>
                        {item.prepTime && (
                          <span className="item-time">
                            <Clock size={12} />
                            {item.prepTime}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="item-actions">
                      <button
                        className="btn-icon-sm"
                        onClick={() => openEditItemModal(item, category.id)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="btn-icon-sm btn-danger"
                        onClick={() => deleteItem(item.id, category.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Item Modal */}
      {showItemModal && (
        <div className="modal-overlay" onClick={() => setShowItemModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
              <button className="btn-icon" onClick={() => setShowItemModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Item Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={itemForm.name}
                  onChange={(e) => setItemForm({...itemForm, name: e.target.value})}
                  placeholder="e.g., Butter Chicken"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  value={itemForm.description}
                  onChange={(e) => setItemForm({...itemForm, description: e.target.value})}
                  placeholder="Describe the dish..."
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    className="form-control"
                    value={itemForm.category}
                    onChange={(e) => setItemForm({...itemForm, category: e.target.value})}
                  >
                    {menuData.categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    className="form-control"
                    value={itemForm.price}
                    onChange={(e) => setItemForm({...itemForm, price: e.target.value})}
                    placeholder="299"
                  />
                </div>

                <div className="form-group">
                  <label>Prep Time</label>
                  <input
                    type="text"
                    className="form-control"
                    value={itemForm.prepTime}
                    onChange={(e) => setItemForm({...itemForm, prepTime: e.target.value})}
                    placeholder="15 mins"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={itemForm.image}
                  onChange={(e) => setItemForm({...itemForm, image: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-row">
                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="isVeg"
                    checked={itemForm.isVeg}
                    onChange={(e) => setItemForm({...itemForm, isVeg: e.target.checked})}
                  />
                  <label htmlFor="isVeg">
                    <Leaf size={14} />
                    Vegetarian
                  </label>
                </div>

                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="isPopular"
                    checked={itemForm.isPopular}
                    onChange={(e) => setItemForm({...itemForm, isPopular: e.target.checked})}
                  />
                  <label htmlFor="isPopular">
                    ★ Mark as Popular
                  </label>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn--secondary" onClick={() => setShowItemModal(false)}>
                Cancel
              </button>
              <button className="btn btn--primary" onClick={saveItem}>
                <Save size={18} />
                {editingItem ? 'Update Item' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="modal-overlay" onClick={() => setShowCategoryModal(false)}>
          <div className="modal modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
              <button className="btn-icon" onClick={() => setShowCategoryModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Category Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                  placeholder="e.g., Appetizers"
                />
              </div>

              <div className="form-group">
                <label>Emoji Icon *</label>
                <input
                  type="text"
                  className="form-control"
                  value={categoryForm.icon}
                  onChange={(e) => setCategoryForm({...categoryForm, icon: e.target.value})}
                  placeholder="e.g., 🥟"
                />
                <small>Use any emoji (Windows: Win + . | Mac: Cmd + Ctrl + Space)</small>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn--secondary" onClick={() => setShowCategoryModal(false)}>
                Cancel
              </button>
              <button className="btn btn--primary" onClick={saveCategory}>
                <Save size={18} />
                {editingCategory ? 'Update' : 'Add'} Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default AdminMenuPage;
