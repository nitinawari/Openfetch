"use client"
import { FormError } from "@/components/form-error"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useState, useEffect, useRef } from "react"
import { BsThreeDots } from "react-icons/bs";
import { TbPencil } from "react-icons/tb";
import { MdDelete } from "react-icons/md";

interface Category {
  id: string,
  name: string
}

interface CategoryProps {
  ActiveCategoryId : string | null,
  setActiveCategoryId : (id :string | null) =>void

}
export const CategoryList = ({ActiveCategoryId, setActiveCategoryId} : CategoryProps) => {

  const [category, setCategory] = useState<Category[]>([])
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const [editingValue, setEditingValue] = useState<string>("")
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  
  //fetch categories
  useEffect(() => {
    fetchCategories()

  }, [])
  const fetchCategories = async () => {
    setIsFetching(true)
    try {
      const res = await fetch("/api/categories")
      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || "Failed to load categories");
      }

      setCategory(result.data)

    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to load categories"
      );
    } finally {
      setIsFetching(false)
    }
  }

  //create categories
  const HandleSubmit = async () => {
    if (!inputValue.trim() || isCreating) return;

    setIsCreating(true);
    try {
      const newCategory = await saveCategory(inputValue);
      setCategory((prev) => [...prev, newCategory])
      setInputValue("");
      setError("")
      setIsAdding(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : "something went wrong");
    } finally {
      setIsCreating(false);
    }
  };

  const saveCategory = async (value: string) => {
    const res = await fetch("/api/categories",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ categoryName: value })
      }
    )

    const result = await res.json()

    if (!res.ok) {
      throw new Error(result.message || "failed to create category")
    }

    return result.data;
  }

  //delete categories
  const HandleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      setCategory(prev =>
        prev.filter(category => category.id !== id)
      )
      setActiveMenuId(null)
    } catch (error) {
      setError(error instanceof Error ? error.message : "something went wrong")
    }
  }
  const deleteCategory = async (id: string) => {
    const res = await fetch(`/api/categories/${id}`, {
      method: "DELETE"
    }
    )
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "failed to delete category")
    }

    return result.data;

  }

  //edit categories
  const HandleEdit = async (id: string) => {
    if (!editingValue.trim()) return

    try {
      const editedCategory = await EditCategory(id);
      setCategory(prev =>
      prev.map(category =>
        category.id === id ? editedCategory : category
      )
    )
      setIsEditing(false)
      setEditingValue("")
      setEditingId("")
      setError("")
    } catch (error) {
      setError(error instanceof Error ? error.message : "something went wrong")
    }
  }

  const EditCategory = async (id: string) => {
    const res = await fetch(`/api/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        categoryName: editingValue
      })
    })

    const result = await res.json()
    if (!res.ok) {
      throw new Error("failed to update category")
    }

    return result.data
  }

  useEffect(() => {
    if (!isEditing) return;

    const input = inputRef.current;
    if (!input) return;

    input.focus();

    const len = input.value.length;
    input.setSelectionRange(len, len);
  }, [isEditing])

  return (
    <div className="h-full w-72 p-4 bg-white border-r">
      <h1 className="font-bold text-center mb-4">Categories</h1>
      {isFetching && (
        <p className="text-sm text-gray-500">Loading categories…</p>
      )}

      {/* list categories  and edit */}
      <div className="space-y-2">
        {category.map((cat) => (
          <div key={cat.id} className="relative">
            {editingId === cat.id && isEditing ?
              (
                <Input
                  value={editingValue}
                  ref={inputRef}
                  onChange={(e) => setEditingValue(e.target.value)}
                />
              )
              :
              (<Button
                className={ActiveCategoryId === cat.id
              ? "bg-black text-white"
              : "bg-white"}
                variant="outline"
                onClick={()=>{
                  if (ActiveCategoryId === cat.id) {
                    setActiveCategoryId(null)
                  } else {
                    setActiveCategoryId(cat.id)
                  }
                }}
              >
                <div className="flex items-center justify-between w-full px-2">
                  <span>{cat.name}</span>
                  <BsThreeDots
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(
                        activeMenuId === cat.id ? null : cat.id
                      )
                    }}
                  />

                </div>
              </Button>
              )
            }

            {/* deleting /editing dialbox */}
            {activeMenuId === cat.id &&
              <div className="absolute left-75 top-2 mt-1 z-10 w-36 rounded-md border border-gray-200 bg-white shadow-lg py-1 space-y-1 ">
                <Button
                  variant="outline"
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setIsEditing(true)
                    setEditingValue(cat.name)
                    setEditingId(cat.id)
                    setActiveMenuId(null)
                    setIsAdding(false)
                  }}
                >
                  <TbPencil className="h-5 w-5" />
                  <p className="ml-1">
                    Rename
                  </p>
                </Button>
                <Button
                  className=" flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 "
                  variant="outline"
                  onClick={() => HandleDelete(cat.id)}
                >
                  <MdDelete className="h-5 w-5 " />
                  <p className="ml-1">
                    Delete
                  </p>
                </Button>
              </div>
            }
            
            {/* editing diabox */}
            {editingId === cat.id && isEditing &&
              <div className="mt-4">
                <div className="flex gap-2">
                  <Button
                    onClick={() => editingId && HandleEdit(editingId)}
                  >
                    {/* {isEditing ? "save" : "saving..."} */} SAVE
                  </Button>
                  <Button
                    onClick={() => {
                      setActiveMenuId("")
                      setIsEditing(false)
                      setEditingId("")
                    }}>
                    cancel
                  </Button>
                </div>
              </div> 
            }
          </div>
        ))}
      </div>
      {/* add new category */}
      <div className="mt-4">
        {isAdding ? (
          <div className="space-y-2">
            <Input
              autoFocus
              placeholder="category name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isCreating}
            />
            {error &&
              <FormError message={error} />
            }
            <div className="flex gap-2">
              <Button
                className=""
                variant="default"
                onClick={HandleSubmit}
                disabled={isCreating}
              >
                {isCreating ? "saving ..." : "save"}
              </Button>

              <Button
                className="outline"
                onClick={() => {
                  setIsAdding(false);
                  setInputValue("")
                  setError(null)
                }
                }
                disabled={isCreating}
              >
                Cancel
              </Button>
            </div>
          </div>) : (
          <Button
            className="mt-2"
            onClick={() => {
              setIsAdding(true)
              setIsEditing(false)
              setActiveMenuId(null);
            }
            }
          >
            create new +
          </Button>
        )
        }
      </div>
    </div>
  )

}
